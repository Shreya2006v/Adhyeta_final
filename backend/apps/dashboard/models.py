"""Dashboard models — study sessions and streaks."""
from django.db import models
from django.conf import settings
from core.mixins import TimestampMixin


class StudySession(TimestampMixin):
    """Represents one study session for a user."""
    SESSION_TYPE_CHOICES = [
        ("study", "Study"),
        ("revision", "Revision"),
        ("practice", "Practice"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="study_sessions",
    )
    subject = models.CharField(max_length=100)
    topic = models.CharField(max_length=200, blank=True)
    session_type = models.CharField(max_length=20, choices=SESSION_TYPE_CHOICES, default="study")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    duration_minutes = models.PositiveIntegerField(default=0)
    xp_earned = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-start_time"]
        verbose_name = "Study Session"

    def __str__(self):
        return f"{self.user.username} — {self.subject} ({self.duration_minutes}m)"

    def save(self, *args, **kwargs):
        # Auto-calculate duration if both times are set
        if self.start_time and self.end_time:
            delta = self.end_time - self.start_time
            self.duration_minutes = max(0, int(delta.total_seconds() / 60))
            # Award XP: 10 XP per 30 minutes
            self.xp_earned = (self.duration_minutes // 30) * 10
        super().save(*args, **kwargs)


class DailyStreak(TimestampMixin):
    """Track daily study streaks per user."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="daily_streaks",
    )
    date = models.DateField()
    sessions_count = models.PositiveIntegerField(default=0)
    total_minutes = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("user", "date")
        ordering = ["-date"]

    def __str__(self):
        return f"{self.user.username} — {self.date} ({self.sessions_count} sessions)"
