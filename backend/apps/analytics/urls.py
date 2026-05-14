from django.urls import path
from .views import SubjectMasteryView, PerformanceTrendView, WeakAreasView

urlpatterns = [
    path("subject-mastery/", SubjectMasteryView.as_view(), name="subject-mastery"),
    path("performance-trend/", PerformanceTrendView.as_view(), name="performance-trend"),
    path("weak-areas/", WeakAreasView.as_view(), name="weak-areas"),
]
