"""Analytics models — subject mastery tracking."""
from django.db import models
from django.conf import settings
from core.mixins import TimestampMixin


class SubjectMastery(TimestampMixin):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="subject_mastery",
    )
    subject = models.CharField(max_length=100)
    mastery_score = models.FloatField(default=0.0)   # 0–100
    sessions_count = models.PositiveIntegerField(default=0)
    test_average = models.FloatField(default=0.0)
    last_studied = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ("user", "subject")
        ordering = ["-mastery_score"]

    def __str__(self):
        return f"{self.user.username} — {self.subject}: {self.mastery_score}%"
