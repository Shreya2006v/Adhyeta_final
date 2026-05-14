from django.urls import path
from .views import (
    GenerateMockTestView,
    SubmitMockTestView,
    MockTestResultsView,
    MockTestHistoryView,
)

urlpatterns = [
    path("generate/", GenerateMockTestView.as_view(), name="mocktest-generate"),
    path("submit/", SubmitMockTestView.as_view(), name="mocktest-submit"),
    path("results/<int:attempt_id>/", MockTestResultsView.as_view(), name="mocktest-results"),
    path("history/", MockTestHistoryView.as_view(), name="mocktest-history"),
]
