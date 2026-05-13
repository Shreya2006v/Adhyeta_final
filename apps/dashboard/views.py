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
