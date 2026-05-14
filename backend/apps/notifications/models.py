"""Notification model."""
from django.db import models
from django.conf import settings
from core.mixins import TimestampMixin


class Notification(TimestampMixin):
    TYPE_CHOICES = [
        ("info", "Info"),
        ("success", "Success"),
        ("warning", "Warning"),
        ("achievement", "Achievement"),
        ("reminder", "Reminder"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications",
    )
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="info")
    is_read = models.BooleanField(default=False)
    action_url = models.CharField(max_length=200, blank=True)  # deep-link for frontend

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        status = "✓" if self.is_read else "●"
        return f"{status} [{self.notification_type}] {self.user.username}: {self.title}"
