"""Accounts admin configuration."""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ["email", "username", "full_name", "role", "xp_points", "streak_count", "is_active"]
    list_filter = ["role", "is_active", "is_staff"]
    search_fields = ["email", "username", "full_name"]
    ordering = ["-created_at"]

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("username", "full_name", "bio", "avatar")}),
        ("Role & Gamification", {"fields": ("role", "xp_points", "streak_count", "last_active")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "full_name", "role", "password1", "password2"),
        }),
    )
