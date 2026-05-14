"""Dashboard serializers."""
from rest_framework import serializers
from .models import StudySession, DailyStreak


class StudySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySession
        fields = [
            "id", "subject", "topic", "session_type",
            "start_time", "end_time", "duration_minutes",
            "xp_earned", "notes", "created_at",
        ]
        read_only_fields = ["id", "duration_minutes", "xp_earned", "created_at"]


class DailyStreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyStreak
        fields = ["id", "date", "sessions_count", "total_minutes"]
        read_only_fields = ["id"]


class DashboardOverviewSerializer(serializers.Serializer):
    """Summary card data for the dashboard."""
    total_xp = serializers.IntegerField()
    current_streak = serializers.IntegerField()
    sessions_this_week = serializers.IntegerField()
    total_study_minutes = serializers.IntegerField()
    rank = serializers.IntegerField()
    level = serializers.IntegerField()
    level_progress_pct = serializers.FloatField()


class HeatmapSerializer(serializers.Serializer):
    date = serializers.DateField()
    count = serializers.IntegerField()  # sessions that day
    minutes = serializers.IntegerField()
