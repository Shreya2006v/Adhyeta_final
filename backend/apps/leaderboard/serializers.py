from rest_framework import serializers
from apps.accounts.serializers import UserSummarySerializer
from .models import LeaderboardEntry


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    user = UserSummarySerializer(read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = ["rank", "user", "xp_points", "weekly_xp", "monthly_xp", "updated_at"]
