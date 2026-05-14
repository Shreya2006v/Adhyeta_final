"""Mock test views — generate, submit, results."""
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from core.response import success_response, created_response, error_response
from .models import MockTest, MockTestAttempt
from .serializers import (
    GenerateQuizSerializer,
    MockTestSerializer,
    SubmitAnswersSerializer,
    MockTestAttemptSerializer,
)
from .ai_quiz import generate_quiz, analyze_attempt


class GenerateMockTestView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=GenerateQuizSerializer,
        tags=["Mock Tests"],
        summary="Generate an AI-powered MCQ test",
        description="Uses Gemini Free API to generate questions. Falls back to sample questions if no API key.",
    )
    def post(self, request):
        serializer = GenerateQuizSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(errors=serializer.errors)

        data = serializer.validated_data
        questions = generate_quiz(
            subject=data["subject"],
            topics=data.get("topics", ""),
            difficulty=data["difficulty"],
            num_questions=data["num_questions"],
        )

        test = MockTest.objects.create(
            user=request.user,
            subject=data["subject"],
            topics=data.get("topics", ""),
            difficulty=data["difficulty"],
            num_questions=len(questions),
            questions_json=questions,
            time_limit_minutes=data["num_questions"] * 2,
        )
        return created_response(
            data=MockTestSerializer(test).data,
            message=f"Generated {len(questions)} questions for {data['subject']}",
        )


class SubmitMockTestView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=SubmitAnswersSerializer,
        tags=["Mock Tests"],
        summary="Submit test answers and get results",
    )
    def post(self, request):
        serializer = SubmitAnswersSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(errors=serializer.errors)

        try:
            test = MockTest.objects.get(
                id=serializer.validated_data["test_id"], user=request.user
            )
        except MockTest.DoesNotExist:
            return error_response(message="Test not found")

        analysis = analyze_attempt(
            test, serializer.validated_data["answers"], test.questions_json
        )

        attempt = MockTestAttempt.objects.create(
            test=test,
            user=request.user,
            answers_json=serializer.validated_data["answers"],
            score=analysis["score"],
            correct_count=analysis["correct_count"],
            time_taken_minutes=serializer.validated_data["time_taken_minutes"],
            completed_at=timezone.now(),
            analysis_json=analysis,
        )

        # Award XP based on score
        xp = int(analysis["score"] / 10)
        if xp > 0:
            request.user.add_xp(xp)

        # Update weak topics
        _update_weak_topics(request.user, test.subject, analysis["wrong_topics"])

        return success_response(
            data={"attempt": MockTestAttemptSerializer(attempt).data, "analysis": analysis},
            message=f"Test submitted! Score: {analysis['score']}%",
        )


class MockTestResultsView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Mock Tests"], summary="Get detailed results for an attempt")
    def get(self, request, attempt_id):
        try:
            attempt = MockTestAttempt.objects.get(id=attempt_id, user=request.user)
        except MockTestAttempt.DoesNotExist:
            return error_response(message="Attempt not found")
        return success_response(
            data={
                "attempt": MockTestAttemptSerializer(attempt).data,
                "analysis": attempt.analysis_json,
            }
        )


class MockTestHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Mock Tests"], summary="List past test attempts")
    def get(self, request):
        attempts = MockTestAttempt.objects.filter(user=request.user).select_related("test")[:30]
        return success_response(data=MockTestAttemptSerializer(attempts, many=True).data)


def _update_weak_topics(user, subject: str, wrong_topics: list):
    """Update WeakTopic records based on test performance."""
    from apps.mentor.models import WeakTopic
    from django.utils import timezone as tz

    for topic in wrong_topics:
        obj, created = WeakTopic.objects.get_or_create(
            user=user, subject=subject, topic=topic,
            defaults={"mastery_score": 30.0},
        )
        if not created:
            # Decrease mastery score on wrong answers
            obj.mastery_score = max(0, obj.mastery_score - 5)
            obj.last_reviewed = tz.now().date()
            obj.save()
