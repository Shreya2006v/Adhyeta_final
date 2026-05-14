"""Leaderboard signals — auto-create entry on new user registration."""
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_leaderboard_entry(sender, instance, created, **kwargs):
    if created:
        from apps.leaderboard.models import LeaderboardEntry
        LeaderboardEntry.objects.get_or_create(
            user=instance,
            defaults={"xp_points": instance.xp_points or 0},
        )
