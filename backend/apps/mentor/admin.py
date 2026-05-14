from django.contrib import admin
from .models import AIChatHistory, WeakTopic, StudyPlan


@admin.register(AIChatHistory)
class AIChatHistoryAdmin(admin.ModelAdmin):
    list_display = ["user", "session_id", "role", "subject", "created_at"]
    list_filter = ["role", "subject"]
    search_fields = ["user__email", "content", "session_id"]


@admin.register(WeakTopic)
class WeakTopicAdmin(admin.ModelAdmin):
    list_display = ["user", "subject", "topic", "mastery_score", "last_reviewed"]
    list_filter = ["subject"]
    search_fields = ["user__email", "topic"]


@admin.register(StudyPlan)
class StudyPlanAdmin(admin.ModelAdmin):
    list_display = ["user", "subject", "generated_at", "is_active"]
    list_filter = ["subject", "is_active"]
