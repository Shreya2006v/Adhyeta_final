from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema, OpenApiParameter
from core.response import success_response
from .models import College, Branch
from .serializers import CollegeSerializer, BranchSerializer

class CollegeListView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(tags=["Institutions"], summary="Get all colleges")
    def get(self, request):
        colleges = College.objects.all().order_by('name')
        data = CollegeSerializer(colleges, many=True).data
        return success_response(data=data)

class BranchListView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        tags=["Institutions"], 
        summary="Get branches for a specific college",
        parameters=[OpenApiParameter("college_id", type=int, required=True)]
    )
    def get(self, request):
        college_id = request.query_params.get("college_id")
        if not college_id:
            return success_response(data=[])
        branches = Branch.objects.filter(college_id=college_id).order_by('name')
        data = BranchSerializer(branches, many=True).data
        return success_response(data=data)
