"""Mentor serializers."""
from rest_framework import serializers
from .models import AIChatHistory, WeakTopic, StudyPlan


class ChatMessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=4000)
    session_id = serializers.CharField(max_length=64, required=False)
    subject = serializers.CharField(max_length=100, required=False, allow_blank=True)


class ChatResponseSerializer(serializers.Serializer):
    session_id = serializers.CharField()
    role = serializers.CharField()
    content = serializers.CharField()
    created_at = serializers.DateTimeField()


class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AIChatHistory
        fields = ["id", "session_id", "role", "content", "subject", "created_at"]


class WeakTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeakTopic
        fields = ["id", "subject", "topic", "mastery_score", "last_reviewed", "updated_at"]
        read_only_fields = ["id", "updated_at"]


class StudyPlanRequestSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=100)
    duration_weeks = serializers.IntegerField(min_value=1, max_value=12, default=4)


class StudyPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyPlan
        fields = ["id", "subject", "plan_json", "generated_at", "is_active"]
        read_only_fields = ["id", "generated_at"]
