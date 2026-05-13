from django.contrib import admin
from .models import LeaderboardEntry


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ["rank", "user", "xp_points", "weekly_xp", "monthly_xp", "updated_at"]
    ordering = ["-xp_points"]
    search_fields = ["user__email", "user__username"]
