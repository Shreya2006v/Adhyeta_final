from django.urls import path
from .views import NotificationListView, MarkReadView, MarkAllReadView

urlpatterns = [
    path("", NotificationListView.as_view(), name="notifications"),
    path("<int:notification_id>/read/", MarkReadView.as_view(), name="notification-read"),
    path("mark-all-read/", MarkAllReadView.as_view(), name="notifications-mark-all"),
]
