from django.urls import path
from .views import (
    DashboardOverviewView,
    StudySessionListCreateView,
    HeatmapView,
    XPHistoryView,
    TeacherExportView,
    TeacherIngestView
)

urlpatterns = [
    path("overview/", DashboardOverviewView.as_view(), name="dashboard-overview"),
    path("study-sessions/", StudySessionListCreateView.as_view(), name="study-sessions"),
    path("heatmap/", HeatmapView.as_view(), name="heatmap"),
    path("xp-history/", XPHistoryView.as_view(), name="xp-history"),
    path("teacher/export/", TeacherExportView.as_view(), name="teacher-export"),
    path("teacher/ingest/", TeacherIngestView.as_view(), name="teacher-ingest"),
]
