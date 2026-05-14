"""Cognitive map views."""
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from core.response import success_response, created_response, error_response
from .models import CognitiveNode
from .serializers import UpdateNodeSerializer, InitializeSubjectSerializer
from .graph_engine import build_cognitive_map, initialize_subject_graph


class CognitiveMapView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        tags=["Cognitive Map"],
        summary="Get full cognitive knowledge map (Three.js ready)",
        description="Returns nodes, edges, mastery scores and weak topics as JSON for frontend visualization.",
    )
    def get(self, request):
        graph_data = build_cognitive_map(request.user)
        return success_response(data=graph_data)


class UpdateNodeMasteryView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=UpdateNodeSerializer,
        tags=["Cognitive Map"],
        summary="Update mastery score for a knowledge node",
    )
    def post(self, request):
        serializer = UpdateNodeSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(errors=serializer.errors)

        try:
            node = CognitiveNode.objects.get(
                id=serializer.validated_data["node_id"], user=request.user
            )
        except CognitiveNode.DoesNotExist:
            return error_response(message="Node not found")

        node.mastery_score = serializer.validated_data["mastery_score"]
        node.save()

        return success_response(data={"id": node.id, "mastery_score": node.mastery_score})


class InitializeSubjectView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=InitializeSubjectSerializer,
        tags=["Cognitive Map"],
        summary="Initialize knowledge graph for a subject",
        description="Creates default topic nodes and prerequisite edges for a subject.",
    )
    def post(self, request):
        serializer = InitializeSubjectSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(errors=serializer.errors)

        subject = serializer.validated_data["subject"]
        initialize_subject_graph(request.user, subject)
        graph = build_cognitive_map(request.user)
        return created_response(data=graph, message=f"Cognitive map initialized for {subject}")
