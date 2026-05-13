"""
ADHYETA WebSocket Consumers
Handles realtime: focus timer, leaderboard, notifications, AI mentor.
"""
import json
from channels.generic.websocket import AsyncWebsocketConsumer


class FocusTimerConsumer(AsyncWebsocketConsumer):
    """
    WebSocket: ws://…/ws/focus/<user_id>/
    Syncs focus timer state in realtime.
    Events sent from client:
      - {"action": "start", "duration": 25}
      - {"action": "pause"}
      - {"action": "resume"}
      - {"action": "stop", "elapsed": 20}
    Server broadcasts current state back to client.
    """

    async def connect(self):
        self.user_id = self.scope["url_route"]["kwargs"]["user_id"]
        self.group_name = f"focus_{self.user_id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        await self.send(json.dumps({"type": "connected", "message": "Focus timer connected"}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get("action", "")

        response = {
            "type": "timer_update",
            "action": action,
            "duration": data.get("duration", 25),
            "elapsed": data.get("elapsed", 0),
            "status": action,
        }
        await self.channel_layer.group_send(
            self.group_name, {"type": "timer.update", "data": response}
        )

    async def timer_update(self, event):
        await self.send(json.dumps(event["data"]))


class LeaderboardConsumer(AsyncWebsocketConsumer):
    """
    WebSocket: ws://…/ws/leaderboard/
    Pushes rank/XP updates to all connected clients.
    """

    async def connect(self):
        self.group_name = "leaderboard"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        await self.send(json.dumps({"type": "connected", "message": "Leaderboard connected"}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        pass  # Leaderboard is server-push only

    async def leaderboard_update(self, event):
        """Called when server pushes a leaderboard update."""
        await self.send(json.dumps({"type": "leaderboard_update", **event["data"]}))


class NotificationConsumer(AsyncWebsocketConsumer):
    """
    WebSocket: ws://…/ws/notifications/<user_id>/
    Pushes new notifications in realtime.
    """

    async def connect(self):
        self.user_id = self.scope["url_route"]["kwargs"]["user_id"]
        self.group_name = f"notifications_{self.user_id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        await self.send(json.dumps({"type": "connected", "message": "Notifications connected"}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get("action") == "mark_read":
            notif_id = data.get("notification_id")
            await self.send(json.dumps({"type": "ack", "notification_id": notif_id}))

    async def notification_message(self, event):
        """Called by send_notification() helper to push new notification."""
        await self.send(json.dumps({"type": "new_notification", **event["notification"]}))
