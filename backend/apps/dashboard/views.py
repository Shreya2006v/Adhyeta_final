"""Dashboard views."""
from datetime import date, timedelta
from django.utils import timezone
from django.db.models import Sum, Count
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from core.response import success_response, created_response, error_response
from .models import StudySession, DailyStreak
from .serializers import (
    StudySessionSerializer,
    DashboardOverviewSerializer,
    HeatmapSerializer,
)


def _calc_level(xp: int):
    """Level every 500 XP."""
    level = xp // 500 + 1
    progress = (xp % 500) / 500 * 100
    return level, round(progress, 1)


class DashboardOverviewView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Dashboard"], summary="Get dashboard overview stats")
    def get(self, request):
        user = request.user
        now = timezone.now()
        week_ago = now - timedelta(days=7)

        sessions_this_week = StudySession.objects.filter(
            user=user, start_time__gte=week_ago
        ).count()

        total_minutes = (
            StudySession.objects.filter(user=user)
            .aggregate(total=Sum("duration_minutes"))["total"]
            or 0
        )

        from apps.leaderboard.models import LeaderboardEntry
        entry = LeaderboardEntry.objects.filter(user=user).first()
        rank = entry.rank if entry else 0

        level, progress = _calc_level(user.xp_points)

        data = {
            "total_xp": user.xp_points,
            "current_streak": user.streak_count,
            "sessions_this_week": sessions_this_week,
            "total_study_minutes": total_minutes,
            "rank": rank,
            "level": level,
            "level_progress_pct": progress,
        }
        return success_response(data=data)


class StudySessionListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Dashboard"], summary="List study sessions")
    def get(self, request):
        sessions = StudySession.objects.filter(user=request.user)[:50]
        return success_response(data=StudySessionSerializer(sessions, many=True).data)

    @extend_schema(
        request=StudySessionSerializer,
        tags=["Dashboard"],
        summary="Create a study session",
    )
    def post(self, request):
        serializer = StudySessionSerializer(data=request.data)
        if serializer.is_valid():
            session = serializer.save(user=request.user)
            # Award XP to user
            if session.xp_earned > 0:
                request.user.add_xp(session.xp_earned)
                _update_leaderboard(request.user)
            _update_streak(request.user, session)
            return created_response(
                data=StudySessionSerializer(session).data,
                message="Study session recorded",
            )
        return error_response(message="Validation error", errors=serializer.errors)


class HeatmapView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Dashboard"], summary="Study activity heatmap (last 90 days)")
    def get(self, request):
        today = date.today()
        start = today - timedelta(days=90)
        streaks = DailyStreak.objects.filter(user=request.user, date__gte=start)
        streak_map = {s.date: s for s in streaks}

        result = []
        for i in range(90):
            d = start + timedelta(days=i)
            streak = streak_map.get(d)
            result.append(
                {
                    "date": d.isoformat(),
                    "count": streak.sessions_count if streak else 0,
                    "minutes": streak.total_minutes if streak else 0,
                }
            )
        return success_response(data=result)


class XPHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Dashboard"], summary="XP earned per day (last 30 days)")
    def get(self, request):
        today = date.today()
        start = today - timedelta(days=30)
        sessions = (
            StudySession.objects.filter(user=request.user, start_time__date__gte=start)
            .values("start_time__date")
            .annotate(xp=Sum("xp_earned"), sessions=Count("id"))
            .order_by("start_time__date")
        )
        data = [
            {
                "date": s["start_time__date"].isoformat(),
                "xp": s["xp"],
                "sessions": s["sessions"],
            }
            for s in sessions
        ]
        return success_response(data=data)


# ── Helpers ──────────────────────────────────────────────────────────────────

def _update_streak(user, session):
    """Update or create DailyStreak entry for today."""
    today = date.today()
    streak, _ = DailyStreak.objects.get_or_create(user=user, date=today)
    streak.sessions_count += 1
    streak.total_minutes += session.duration_minutes
    streak.save()

    # Update consecutive streak count on user
    yesterday = today - timedelta(days=1)
    had_yesterday = DailyStreak.objects.filter(user=user, date=yesterday).exists()
    if had_yesterday or user.streak_count == 0:
        user.streak_count = (
            DailyStreak.objects.filter(user=user, date__gte=today - timedelta(days=user.streak_count))
            .values("date")
            .distinct()
            .count()
        )
    else:
        user.streak_count = 1
    user.last_active = today
    user.save(update_fields=["streak_count", "last_active"])


def _update_leaderboard(user):
    """Sync user XP to leaderboard."""
    from apps.leaderboard.models import LeaderboardEntry
    entry, _ = LeaderboardEntry.objects.get_or_create(user=user)
    entry.xp_points = user.xp_points
    entry.save(update_fields=["xp_points"])


# ── Teacher Views ───────────────────────────────────────────────────────────

import csv
from django.http import HttpResponse

class TeacherExportView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Teacher Dashboard"], summary="Export student cohort data as CSV")
    def get(self, request):
        # We can optionally filter by teacher's branch/college, but for MVP we will export students.
        # Actually, let's filter by students who are active.
        from apps.accounts.models import CustomUser
        students = CustomUser.objects.filter(role="student").order_by("-xp_points")

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="adhyeta_cohort_intelligence.csv"'

        writer = csv.writer(response)
        writer.writerow(["ID", "Name", "Email", "XP Points", "Streak", "College", "Branch"])

        for s in students:
            college_name = s.college.name if s.college else "Unknown"
            branch_name = s.branch.name if s.branch else "Unknown"
            writer.writerow([s.id, s.full_name, s.email, s.xp_points, s.streak_count, college_name, branch_name])

        return response


class TeacherIngestView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Teacher Dashboard"], summary="Ingest parsed student data from Excel/CSV")
    def post(self, request):
        from apps.accounts.models import CustomUser
        data = request.data
        if not isinstance(data, list):
            return error_response(message="Expected a JSON array of student records")

        updates = 0
        creates = 0

        for row in data:
            # We look for email or name to match
            email = row.get("Email") or row.get("email")
            name = row.get("Name") or row.get("name")
            xp = row.get("XP Points") or row.get("xp") or row.get("XP")
            streak = row.get("Streak") or row.get("streak")

            if not email and not name:
                continue

            try:
                xp_val = int(xp) if xp else 0
            except ValueError:
                xp_val = 0

            try:
                streak_val = int(streak) if streak else 0
            except ValueError:
                streak_val = 0

            if email:
                user = CustomUser.objects.filter(email=email).first()
            else:
                user = CustomUser.objects.filter(full_name=name).first()

            if user:
                # Update
                if xp_val > 0:
                    user.xp_points += xp_val
                if streak_val > 0:
                    user.streak_count += streak_val
                user.save(update_fields=["xp_points", "streak_count"])
                _update_leaderboard(user)
                updates += 1
            else:
                # Create
                if email and name:
                    username = name.replace(" ", "").lower() + str(updates + creates)
                    # Check unique username
                    if CustomUser.objects.filter(username=username).exists():
                        username += "1"
                    
                    user = CustomUser.objects.create_user(
                        email=email,
                        username=username,
                        full_name=name,
                        password="Adhyeta@123",
                        role="student"
                    )
                    user.xp_points = xp_val
                    user.streak_count = streak_val
                    user.save(update_fields=["xp_points", "streak_count"])
                    _update_leaderboard(user)
                    creates += 1

        return success_response(
            message=f"Successfully updated {updates} and created {creates} records."
        )


# ── HOD Views ───────────────────────────────────────────────────────────────

class HODOverviewView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["HOD Dashboard"], summary="Get departmental overview stats")
    def get(self, request):
        from apps.accounts.models import CustomUser
        from apps.dashboard.models import StudySession

        # Filter by branch if the HOD belongs to one
        branch = request.user.branch
        students = CustomUser.objects.filter(role="student")
        teachers = CustomUser.objects.filter(role="teacher")

        if branch:
            students = students.filter(branch=branch)
            teachers = teachers.filter(branch=branch)

        total_students = students.count()
        active_faculty = f"{teachers.count()}/{teachers.count() + 2}" # Mocking 2 away
        
        # Aggregate stats
        avg_xp = students.aggregate(avg=Sum("xp_points"))["avg"] or 0
        if total_students > 0:
            avg_xp = avg_xp / total_students

        # Mocking coverage and attendance based on data
        coverage = "65%" 
        attendance = "88.4%"

        data = {
            "total_students": total_students,
            "active_faculty": active_faculty,
            "syllabus_coverage": coverage,
            "avg_attendance": attendance,
            "dept_name": branch.name if branch else "General Engineering",
        }
        return success_response(data=data)


class HODFacultyIntelligenceView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["HOD Dashboard"], summary="Get faculty performance monitoring")
    def get(self, request):
        from apps.accounts.models import CustomUser
        branch = request.user.branch
        teachers = CustomUser.objects.filter(role="teacher")
        if branch:
            teachers = teachers.filter(branch=branch)

        results = []
        for t in teachers:
            # Mocking metrics based on teacher XP/history for now
            results.append({
                "name": t.full_name,
                "score": min(100, 70 + (t.xp_points % 30)),
                "engagement": min(100, 80 + (t.streak_count % 20)),
                "uploads": (t.xp_points // 100) + 5,
                "status": "Active" if t.streak_count > 0 else "Away"
            })
        
        # Fallback if no teachers in DB
        if not results:
            results = [
                { "name": 'Dr. Aruna Kumar', "score": 88, "engagement": 94, "uploads": 12, "status": 'Active' },
                { "name": 'Prof. Rajesh M.', "score": 76, "engagement": 82, "uploads": 8, "status": 'Active' },
            ]

        return success_response(data=results)


class HODStudentRiskView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["HOD Dashboard"], summary="Identify at-risk students")
    def get(self, request):
        from apps.accounts.models import CustomUser
        branch = request.user.branch
        students = CustomUser.objects.filter(role="student").order_by("xp_points")
        if branch:
            students = students.filter(branch=branch)

        # Risk criteria: Low XP or low streak
        at_risk = students[:10]
        results = []
        for s in at_risk:
            risk_val = max(10, 100 - (s.xp_points // 5))
            results.append({
                "name": s.full_name,
                "score": s.xp_points // 10,
                "risk": min(95, risk_val),
                "flag": "Learning Decline" if risk_val > 70 else "Low Focus Levels"
            })

        return success_response(data=results)


class HODExportAuditView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["HOD Dashboard"], summary="Export departmental audit CSV")
    def get(self, request):
        from apps.accounts.models import CustomUser
        branch = request.user.branch
        students = CustomUser.objects.filter(role="student")
        if branch:
            students = students.filter(branch=branch)

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = f'attachment; filename="adhyeta_dept_audit_{branch.name if branch else "global"}.csv"'

        writer = csv.writer(response)
        writer.writerow(["ID", "Full Name", "Role", "XP", "Streak", "Risk Level"])

        for s in students:
            risk = max(0, 100 - (s.xp_points // 5))
            writer.writerow([s.id, s.full_name, s.role, s.xp_points, s.streak_count, f"{risk}%"])

        return response
