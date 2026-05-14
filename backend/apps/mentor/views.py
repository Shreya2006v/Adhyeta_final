"""Mentor views — chat, study plan, weak topics."""
import uuid
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from core.response import success_response, created_response, error_response
from .models import AIChatHistory, WeakTopic, StudyPlan
from .serializers import (
    ChatMessageSerializer,
    ChatHistorySerializer,
    WeakTopicSerializer,
    StudyPlanRequestSerializer,
    StudyPlanSerializer,
)
from .ai_service import mentor_chat, generate_study_plan


class MentorChatView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=ChatMessageSerializer,
        tags=["AI Mentor"],
        summary="Send a message to the AI mentor",
        description="Uses Groq (llama-3.3-70b) with Gemini Flash fallback. "
                    "Remembers last 20 messages per session. Returns markdown.",
    )
    def post(self, request):
        serializer = ChatMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(message="Invalid input", errors=serializer.errors)

        message = serializer.validated_data["message"]
        session_id = serializer.validated_data.get("session_id") or str(uuid.uuid4())
        subject = serializer.validated_data.get("subject", "")

        # Store user message
        AIChatHistory.objects.create(
            user=request.user,
            session_id=session_id,
            role="user",
            content=message,
            subject=subject,
        )

        # Get chat history for context
        history = AIChatHistory.objects.filter(
            user=request.user, session_id=session_id
        ).order_by("created_at")

        # Get AI response
        ai_response = mentor_chat(request.user, message, session_id, list(history))

        # Store AI response
        ai_msg = AIChatHistory.objects.create(
            user=request.user,
            session_id=session_id,
            role="assistant",
            content=ai_response,
            subject=subject,
        )

        return success_response(
            data={
                "session_id": session_id,
                "role": "assistant",
                "content": ai_response,
                "created_at": ai_msg.created_at.isoformat(),
            },
            message="Response generated",
        )


class ChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["AI Mentor"], summary="Get chat history for a session")
    def get(self, request):
        session_id = request.query_params.get("session_id")
        qs = AIChatHistory.objects.filter(user=request.user)
        if session_id:
            qs = qs.filter(session_id=session_id)
        qs = qs.order_by("created_at")[:100]
        return success_response(data=ChatHistorySerializer(qs, many=True).data)


class StudyPlanView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=StudyPlanRequestSerializer,
        tags=["AI Mentor"],
        summary="Generate a personalized study plan",
    )
    def post(self, request):
        serializer = StudyPlanRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(message="Invalid input", errors=serializer.errors)

        subject = serializer.validated_data["subject"]
        weeks = serializer.validated_data["duration_weeks"]

        plan_data = generate_study_plan(request.user, subject, weeks)

        # Deactivate old plans for same subject
        StudyPlan.objects.filter(user=request.user, subject=subject).update(is_active=False)

        plan = StudyPlan.objects.create(
            user=request.user,
            subject=subject,
            plan_json=plan_data,
        )
        return created_response(
            data=StudyPlanSerializer(plan).data,
            message="Study plan generated successfully",
        )

    @extend_schema(tags=["AI Mentor"], summary="Get current study plans")
    def get(self, request):
        plans = StudyPlan.objects.filter(user=request.user, is_active=True)
        return success_response(data=StudyPlanSerializer(plans, many=True).data)


class WeakTopicsView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["AI Mentor"], summary="Get user's weak topics")
    def get(self, request):
        topics = WeakTopic.objects.filter(user=request.user).order_by("mastery_score")
        return success_response(data=WeakTopicSerializer(topics, many=True).data)
