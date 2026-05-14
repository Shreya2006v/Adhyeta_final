from rest_framework import serializers
from .models import MockTest, MockTestAttempt


class GenerateQuizSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=100)
    topics = serializers.CharField(max_length=500, required=False, allow_blank=True)
    difficulty = serializers.ChoiceField(choices=["easy", "medium", "hard"], default="medium")
    num_questions = serializers.IntegerField(min_value=3, max_value=30, default=10)


class MockTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockTest
        fields = [
            "id", "subject", "topics", "difficulty", "num_questions",
            "questions_json", "time_limit_minutes", "is_adaptive", "created_at",
        ]
        read_only_fields = ["id", "questions_json", "created_at"]


class SubmitAnswersSerializer(serializers.Serializer):
    test_id = serializers.IntegerField()
    answers = serializers.DictField(
        child=serializers.IntegerField(),
        help_text='Map of question index (str) to selected option index. e.g. {"0": 2, "1": 0}',
    )
    time_taken_minutes = serializers.IntegerField(min_value=0, default=0)


class MockTestAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockTestAttempt
        fields = [
            "id", "test", "score", "correct_count", "time_taken_minutes",
            "completed_at", "analysis_json",
        ]
        read_only_fields = ["id", "score", "correct_count", "completed_at", "analysis_json"]
