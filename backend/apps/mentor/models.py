"""Mentor models — chat history, weak topics, study plans."""
from django.db import models
from django.conf import settings
from core.mixins import TimestampMixin


class AIChatHistory(TimestampMixin):
    """Stores individual messages in an AI mentor conversation."""
    ROLE_CHOICES = [("user", "User"), ("assistant", "Assistant")]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="chat_history",
    )
    session_id = models.CharField(max_length=64, db_index=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    subject = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"[{self.session_id}] {self.role}: {self.content[:60]}"


class WeakTopic(TimestampMixin):
    """Topics the AI identifies as needing more attention."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="weak_topics",
    )
    subject = models.CharField(max_length=100)
    topic = models.CharField(max_length=200)
    mastery_score = models.FloatField(default=0.0)  # 0–100
    last_reviewed = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ("user", "subject", "topic")
        ordering = ["mastery_score"]

    def __str__(self):
        return f"{self.user.username} — {self.subject}/{self.topic} ({self.mastery_score}%)"


class StudyPlan(TimestampMixin):
    """AI-generated personalized study plan."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="study_plans",
    )
    subject = models.CharField(max_length=100)
    plan_json = models.JSONField()  # structured daily plan
    generated_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-generated_at"]

    def __str__(self):
        return f"{self.user.username} — {self.subject} plan"
