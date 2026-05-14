"""Custom DRF permission classes for role-based access."""
from rest_framework.permissions import BasePermission


class IsStudent(BasePermission):
    """Allow only users with role='student'."""
    message = "Only students can access this resource."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "student"
        )


class IsTeacher(BasePermission):
    """Allow only users with role='teacher'."""
    message = "Only teachers can access this resource."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "teacher"
        )


class IsAdmin(BasePermission):
    """Allow only users with role='admin'."""
    message = "Only admins can access this resource."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "admin"
        )


class IsStudentOrTeacher(BasePermission):
    """Allow students and teachers."""
    message = "Students and teachers only."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in ("student", "teacher")
        )


class IsOwnerOrAdmin(BasePermission):
    """Object-level: owner or admin can access."""

    def has_object_permission(self, request, view, obj):
        if request.user.role == "admin":
            return True
        owner = getattr(obj, "user", None)
        return owner == request.user
