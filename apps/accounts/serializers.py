"""Serializers for accounts app."""
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")

    class Meta:
        model = CustomUser
        fields = ["email", "username", "full_name", "role", "password", "password2"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        return CustomUser.objects.create_user(**validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id", "email", "username", "full_name", "role",
            "bio", "avatar", "xp_points", "streak_count",
            "last_active", "created_at",
        ]
        read_only_fields = ["id", "email", "role", "xp_points", "streak_count", "created_at"]


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["full_name", "username", "bio", "avatar"]


class UserSummarySerializer(serializers.ModelSerializer):
    """Lightweight user info for leaderboard, etc."""
    class Meta:
        model = CustomUser
        fields = ["id", "username", "full_name", "avatar", "xp_points", "role"]
