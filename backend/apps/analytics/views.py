"""Analytics views — mastery, performance trends, weak areas."""
from datetime import date, timedelta
from django.db.models import Avg, Count
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from core.response import success_response
from .models import SubjectMastery
from .serializers import SubjectMasterySerializer
from apps.mocktest.models import MockTestAttempt
from apps.mentor.models import WeakTopic


class SubjectMasteryView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Analytics"], summary="Get subject mastery scores")
    def get(self, request):
        mastery = SubjectMastery.objects.filter(user=request.user)
        return success_response(data=SubjectMasterySerializer(mastery, many=True).data)


class PerformanceTrendView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Analytics"], summary="Test score trend over last 30 days")
    def get(self, request):
        start = date.today() - timedelta(days=30)
        attempts = (
            MockTestAttempt.objects.filter(user=request.user, completed_at__date__gte=start)
            .values("completed_at__date", "test__subject")
            .annotate(avg_score=Avg("score"), count=Count("id"))
            .order_by("completed_at__date")
        )
        data = [
            {
                "date": a["completed_at__date"].isoformat(),
                "subject": a["test__subject"],
                "avg_score": round(a["avg_score"], 1),
                "tests_count": a["count"],
            }
            for a in attempts
        ]
        return success_response(data=data)


class WeakAreasView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Analytics"], summary="Topics with lowest mastery scores")
    def get(self, request):
        topics = WeakTopic.objects.filter(user=request.user, mastery_score__lt=60).order_by(
            "mastery_score"
        )[:10]
        from apps.mentor.serializers import WeakTopicSerializer
        return success_response(data=WeakTopicSerializer(topics, many=True).data)
