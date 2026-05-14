"""Serializers for accounts app."""
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")

    college_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    branch_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ["email", "username", "full_name", "role", "password", "password2", "college_id", "branch_id"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        return CustomUser.objects.create_user(**validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
    college = serializers.SerializerMethodField()
    branch = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id", "email", "username", "full_name", "role",
            "bio", "avatar", "xp_points", "streak_count",
            "last_active", "created_at", "college", "branch"
        ]
        read_only_fields = ["id", "email", "role", "xp_points", "streak_count", "created_at", "college", "branch"]

    def get_college(self, obj):
        if obj.college:
            from apps.institutions.serializers import CollegeSerializer
            return CollegeSerializer(obj.college).data
        return None

    def get_branch(self, obj):
        if obj.branch:
            from apps.institutions.serializers import BranchSerializer
            return BranchSerializer(obj.branch).data
        return None


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["full_name", "username", "bio", "avatar"]


class UserSummarySerializer(serializers.ModelSerializer):
    """Lightweight user info for leaderboard, etc."""
    class Meta:
        model = CustomUser
        fields = ["id", "username", "full_name", "avatar", "xp_points", "role"]
