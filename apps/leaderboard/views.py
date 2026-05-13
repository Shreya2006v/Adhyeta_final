"""Leaderboard views."""
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from core.response import success_response
from .models import LeaderboardEntry
from .serializers import LeaderboardEntrySerializer


class GlobalLeaderboardView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Leaderboard"], summary="Global top 50 leaderboard")
    def get(self, request):
        entries = LeaderboardEntry.objects.select_related("user").order_by("-xp_points")[:50]
        LeaderboardEntry.recompute_ranks()
        return success_response(data=LeaderboardEntrySerializer(entries, many=True).data)


class WeeklyLeaderboardView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Leaderboard"], summary="Weekly top 50 leaderboard")
    def get(self, request):
        entries = LeaderboardEntry.objects.select_related("user").order_by("-weekly_xp")[:50]
        return success_response(data=LeaderboardEntrySerializer(entries, many=True).data)


class MyRankView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Leaderboard"], summary="Get current user's rank and XP")
    def get(self, request):
        entry, _ = LeaderboardEntry.objects.get_or_create(
            user=request.user,
            defaults={"xp_points": request.user.xp_points},
        )
        return success_response(data=LeaderboardEntrySerializer(entry).data)
