"""Custom User model with role-based access."""
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from core.mixins import TimestampMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin, TimestampMixin):
    ROLE_CHOICES = [
        ("student", "Student"),
        ("teacher", "Teacher"),
        ("admin", "Admin"),
    ]

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=120)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="student")
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)

    # Institution
    college = models.ForeignKey("institutions.College", on_delete=models.SET_NULL, null=True, blank=True, related_name="users")
    branch = models.ForeignKey("institutions.Branch", on_delete=models.SET_NULL, null=True, blank=True, related_name="users")

    # Gamification
    xp_points = models.PositiveIntegerField(default=0)
    streak_count = models.PositiveIntegerField(default=0)
    last_active = models.DateField(null=True, blank=True)

    # Django internals
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "full_name"]

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} ({self.email})"

    def add_xp(self, points: int):
        """Add XP and persist."""
        self.xp_points += points
        self.save(update_fields=["xp_points"])
