"""Notification views."""
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from core.response import success_response
from .models import Notification
from .serializers import NotificationSerializer


class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Notifications"], summary="List all notifications")
    def get(self, request):
        notifications = Notification.objects.filter(user=request.user)[:50]
        unread_count = Notification.objects.filter(user=request.user, is_read=False).count()
        return success_response(
            data={
                "unread_count": unread_count,
                "notifications": NotificationSerializer(notifications, many=True).data,
            }
        )


class MarkReadView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Notifications"], summary="Mark notification as read")
    def post(self, request, notification_id):
        try:
            notif = Notification.objects.get(id=notification_id, user=request.user)
            notif.is_read = True
            notif.save(update_fields=["is_read"])
            return success_response(message="Marked as read")
        except Notification.DoesNotExist:
            from core.response import error_response
            return error_response(message="Notification not found")


class MarkAllReadView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Notifications"], summary="Mark all notifications as read")
    def post(self, request):
        count = Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        return success_response(message=f"Marked {count} notifications as read")


def send_notification(user, title: str, message: str, notification_type: str = "info", action_url: str = ""):
    """Helper to create and push a notification."""
    notif = Notification.objects.create(
        user=user,
        title=title,
        message=message,
        notification_type=notification_type,
        action_url=action_url,
    )
    # Push via WebSocket if connected
    try:
        from channels.layers import get_channel_layer
        from asgiref.sync import async_to_sync
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"notifications_{user.id}",
            {
                "type": "notification.message",
                "notification": NotificationSerializer(notif).data,
            },
        )
    except Exception:
        pass  # WebSocket push is best-effort
    return notif
