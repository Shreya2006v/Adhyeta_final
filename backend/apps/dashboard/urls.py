from django.urls import path
from . import views

urlpatterns = [
    path("overview/", views.DashboardOverviewView.as_view(), name="dashboard-overview"),
    path("study-sessions/", views.StudySessionListCreateView.as_view(), name="study-sessions"),
    path("heatmap/", views.HeatmapView.as_view(), name="heatmap"),
    path("xp-history/", views.XPHistoryView.as_view(), name="xp-history"),
    path("teacher/export/", views.TeacherExportView.as_view(), name="teacher-export"),
    path("teacher/ingest/", views.TeacherIngestView.as_view(), name="teacher-ingest"),

    # HOD Endpoints
    path("hod/overview/", views.HODOverviewView.as_view(), name="hod-overview"),
    path("hod/faculty/", views.HODFacultyIntelligenceView.as_view(), name="hod-faculty"),
    path("hod/risk/", views.HODStudentRiskView.as_view(), name="hod-risk"),
    path("hod/export/", views.HODExportAuditView.as_view(), name="hod-export"),
]
