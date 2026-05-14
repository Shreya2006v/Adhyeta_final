from django.contrib import admin
from .models import MockTest, MockTestAttempt


@admin.register(MockTest)
class MockTestAdmin(admin.ModelAdmin):
    list_display = ["user", "subject", "difficulty", "num_questions", "created_at"]
    list_filter = ["difficulty", "subject"]
    search_fields = ["user__email", "subject"]


@admin.register(MockTestAttempt)
class MockTestAttemptAdmin(admin.ModelAdmin):
    list_display = ["user", "test", "score", "correct_count", "time_taken_minutes", "completed_at"]
    list_filter = ["test__subject"]
