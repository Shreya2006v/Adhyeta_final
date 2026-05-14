from django.urls import path
from .views import CognitiveMapView, UpdateNodeMasteryView, InitializeSubjectView

urlpatterns = [
    path("map/", CognitiveMapView.as_view(), name="cognitive-map"),
    path("update/", UpdateNodeMasteryView.as_view(), name="cognitive-update"),
    path("initialize/", InitializeSubjectView.as_view(), name="cognitive-initialize"),
]
