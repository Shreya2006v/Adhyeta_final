from django.urls import path
from .views import MentorChatView, ChatHistoryView, StudyPlanView, WeakTopicsView

urlpatterns = [
    path("chat/", MentorChatView.as_view(), name="mentor-chat"),
    path("history/", ChatHistoryView.as_view(), name="mentor-history"),
    path("study-plan/", StudyPlanView.as_view(), name="study-plan"),
    path("weak-topics/", WeakTopicsView.as_view(), name="weak-topics"),
]
