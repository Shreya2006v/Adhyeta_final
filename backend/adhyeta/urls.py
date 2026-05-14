"""ADHYETA root URL configuration."""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    # ── Root Redirect ────────────────────────────────────────────────────────
    path("", RedirectView.as_view(url="api/docs/", permanent=False)),

    # ── Admin ────────────────────────────────────────────────────────────────
    path("admin/", admin.site.urls),

    # ── API v1 ───────────────────────────────────────────────────────────────
    path("api/auth/", include("apps.accounts.urls")),
    path("api/dashboard/", include("apps.dashboard.urls")),
    path("api/mentor/", include("apps.mentor.urls")),
    path("api/focus/", include("apps.focus.urls")),
    path("api/mocktest/", include("apps.mocktest.urls")),
    path("api/leaderboard/", include("apps.leaderboard.urls")),
    path("api/analytics/", include("apps.analytics.urls")),
    path("api/cognitive/", include("apps.cognitive.urls")),
    path("api/notifications/", include("apps.notifications.urls")),
    path("api/institutions/", include("apps.institutions.urls")),

    # ── OpenAPI Docs ─────────────────────────────────────────────────────────
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
