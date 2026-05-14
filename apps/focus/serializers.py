from rest_framework import serializers
from .models import FocusSession


class StartFocusSessionSerializer(serializers.Serializer):
    session_type = serializers.ChoiceField(
        choices=["pomodoro", "deep", "short", "long"], default="pomodoro"
    )
    target_minutes = serializers.IntegerField(min_value=1, max_value=240, default=25)
    subject = serializers.CharField(max_length=100, required=False, allow_blank=True)


class EndFocusSessionSerializer(serializers.Serializer):
    session_id = serializers.IntegerField()
    actual_minutes = serializers.IntegerField(min_value=0)
    completed = serializers.BooleanField(default=False)
    interruptions = serializers.IntegerField(min_value=0, default=0)


class FocusSessionSerializer(serializers.ModelSerializer):
    completion_rate = serializers.ReadOnlyField()

    class Meta:
        model = FocusSession
        fields = [
            "id", "session_type", "target_minutes", "actual_minutes",
            "start_time", "end_time", "completed", "subject",
            "interruptions", "completion_rate", "created_at",
        ]
        read_only_fields = ["id", "created_at"]
