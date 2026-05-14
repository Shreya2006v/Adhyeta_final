"""Mock test models."""
from django.db import models
from django.conf import settings
from core.mixins import TimestampMixin


class MockTest(TimestampMixin):
    DIFFICULTY_CHOICES = [
        ("easy", "Easy"),
        ("medium", "Medium"),
        ("hard", "Hard"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="mock_tests",
    )
    subject = models.CharField(max_length=100)
    topics = models.CharField(max_length=500, blank=True)  # comma-separated
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default="medium")
    num_questions = models.PositiveIntegerField(default=10)
    questions_json = models.JSONField(default=list)
    time_limit_minutes = models.PositiveIntegerField(default=20)
    is_adaptive = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} — {self.subject} ({self.difficulty})"


class MockTestAttempt(TimestampMixin):
    test = models.ForeignKey(MockTest, on_delete=models.CASCADE, related_name="attempts")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="test_attempts",
    )
    answers_json = models.JSONField(default=dict)  # {question_index: selected_option}
    score = models.FloatField(default=0.0)  # 0–100
    correct_count = models.PositiveIntegerField(default=0)
    time_taken_minutes = models.PositiveIntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    analysis_json = models.JSONField(default=dict)  # {wrong_topics: [], suggestions: []}

    class Meta:
        ordering = ["-completed_at"]

    def __str__(self):
        return f"{self.user.username} — score: {self.score}%"
