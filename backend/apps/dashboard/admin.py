from django.contrib import admin
from .models import StudySession, DailyStreak


@admin.register(StudySession)
class StudySessionAdmin(admin.ModelAdmin):
    list_display = ["user", "subject", "duration_minutes", "xp_earned", "start_time"]
    list_filter = ["session_type", "subject"]
    search_fields = ["user__email", "subject"]


@admin.register(DailyStreak)
class DailyStreakAdmin(admin.ModelAdmin):
    list_display = ["user", "date", "sessions_count", "total_minutes"]
    list_filter = ["date"]
