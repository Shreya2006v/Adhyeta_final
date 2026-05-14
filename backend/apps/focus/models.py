"""Focus models — Pomodoro/deep-work sessions."""
from django.db import models
from django.conf import settings
from core.mixins import TimestampMixin


class FocusSession(TimestampMixin):
    SESSION_TYPE_CHOICES = [
        ("pomodoro", "Pomodoro (25 min)"),
        ("deep", "Deep Work"),
        ("short", "Short Break"),
        ("long", "Long Break"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="focus_sessions",
    )
    session_type = models.CharField(max_length=20, choices=SESSION_TYPE_CHOICES, default="pomodoro")
    target_minutes = models.PositiveIntegerField(default=25)
    actual_minutes = models.PositiveIntegerField(default=0)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    subject = models.CharField(max_length=100, blank=True)
    interruptions = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-start_time"]

    def __str__(self):
        status = "✓" if self.completed else "✗"
        return f"{status} {self.user.username} — {self.session_type} ({self.actual_minutes}/{self.target_minutes}m)"

    @property
    def completion_rate(self):
        if self.target_minutes == 0:
            return 0
        return min(100, round(self.actual_minutes / self.target_minutes * 100, 1))
