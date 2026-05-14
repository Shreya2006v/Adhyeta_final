"""Focus views — start/end sessions, analytics."""
from django.utils import timezone
from django.db.models import Sum, Count, Avg
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from core.response import success_response, created_response, error_response
from .models import FocusSession
from .serializers import (
    StartFocusSessionSerializer,
    EndFocusSessionSerializer,
    FocusSessionSerializer,
)


class StartFocusView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=StartFocusSessionSerializer, tags=["Focus"], summary="Start a focus session")
    def post(self, request):
        serializer = StartFocusSessionSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(errors=serializer.errors)

        session = FocusSession.objects.create(
            user=request.user,
            start_time=timezone.now(),
            **serializer.validated_data,
        )
        return created_response(
            data=FocusSessionSerializer(session).data,
            message="Focus session started",
        )


class EndFocusView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=EndFocusSessionSerializer, tags=["Focus"], summary="End a focus session")
    def post(self, request):
        serializer = EndFocusSessionSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(errors=serializer.errors)

        try:
            session = FocusSession.objects.get(
                id=serializer.validated_data["session_id"], user=request.user
            )
        except FocusSession.DoesNotExist:
            return error_response(message="Session not found", status=404)

        session.end_time = timezone.now()
        session.actual_minutes = serializer.validated_data["actual_minutes"]
        session.completed = serializer.validated_data["completed"]
        session.interruptions = serializer.validated_data["interruptions"]
        session.save()

        # Award XP for completed sessions
        if session.completed:
            xp = session.actual_minutes // 25 * 15  # 15 XP per Pomodoro
            if xp > 0:
                request.user.add_xp(xp)

        return success_response(
            data=FocusSessionSerializer(session).data,
            message="Focus session completed",
        )


class FocusSessionListView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Focus"], summary="List all focus sessions")
    def get(self, request):
        sessions = FocusSession.objects.filter(user=request.user)[:50]
        return success_response(data=FocusSessionSerializer(sessions, many=True).data)


class FocusAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Focus"], summary="Focus analytics — completion rates, totals")
    def get(self, request):
        qs = FocusSession.objects.filter(user=request.user)
        totals = qs.aggregate(
            total_sessions=Count("id"),
            total_minutes=Sum("actual_minutes"),
            completed_sessions=Count("id", filter=models.Q(completed=True)),
            avg_interruptions=Avg("interruptions"),
        )
        completion_rate = 0
        if totals["total_sessions"]:
            completion_rate = round(
                totals["completed_sessions"] / totals["total_sessions"] * 100, 1
            )
        return success_response(
            data={
                **totals,
                "completion_rate_pct": completion_rate,
                "total_hours": round((totals["total_minutes"] or 0) / 60, 1),
            }
        )


# Need models.Q import
from django.db import models
