"""Leaderboard models."""
from django.db import models
from django.conf import settings
from core.mixins import TimestampMixin


class LeaderboardEntry(TimestampMixin):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="leaderboard_entry",
    )
    xp_points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)
    weekly_xp = models.PositiveIntegerField(default=0)
    monthly_xp = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-xp_points"]
        verbose_name = "Leaderboard Entry"

    def __str__(self):
        return f"#{self.rank} {self.user.username} — {self.xp_points} XP"

    @classmethod
    def recompute_ranks(cls):
        """Re-rank all entries by XP (call after XP updates)."""
        entries = cls.objects.order_by("-xp_points")
        for i, entry in enumerate(entries, start=1):
            if entry.rank != i:
                entry.rank = i
                entry.save(update_fields=["rank"])
