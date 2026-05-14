from django.contrib import admin
from .models import FocusSession


@admin.register(FocusSession)
class FocusSessionAdmin(admin.ModelAdmin):
    list_display = ["user", "session_type", "target_minutes", "actual_minutes", "completed", "start_time"]
    list_filter = ["session_type", "completed"]
    search_fields = ["user__email", "subject"]
