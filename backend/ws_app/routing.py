"""WebSocket URL routing for Django Channels."""
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/focus/(?P<user_id>\d+)/$", consumers.FocusTimerConsumer.as_asgi()),
    re_path(r"ws/leaderboard/$", consumers.LeaderboardConsumer.as_asgi()),
    re_path(r"ws/notifications/(?P<user_id>\d+)/$", consumers.NotificationConsumer.as_asgi()),
]
