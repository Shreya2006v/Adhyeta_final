from django.urls import path
from .views import StartFocusView, EndFocusView, FocusSessionListView, FocusAnalyticsView

urlpatterns = [
    path("start/", StartFocusView.as_view(), name="focus-start"),
    path("end/", EndFocusView.as_view(), name="focus-end"),
    path("sessions/", FocusSessionListView.as_view(), name="focus-sessions"),
    path("analytics/", FocusAnalyticsView.as_view(), name="focus-analytics"),
]
