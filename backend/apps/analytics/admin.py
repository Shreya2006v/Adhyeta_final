from django.contrib import admin
from .models import SubjectMastery


@admin.register(SubjectMastery)
class SubjectMasteryAdmin(admin.ModelAdmin):
    list_display = ["user", "subject", "mastery_score", "sessions_count", "last_studied"]
    list_filter = ["subject"]
    search_fields = ["user__email", "subject"]
