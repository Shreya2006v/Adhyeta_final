"""Account views — register, login, profile."""
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema, OpenApiResponse

from core.response import success_response, created_response, error_response
from .serializers import RegisterSerializer, UserProfileSerializer, UpdateProfileSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=RegisterSerializer,
        responses={201: UserProfileSerializer},
        tags=["Auth"],
        summary="Register a new user",
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            data = UserProfileSerializer(user).data
            return created_response(data=data, message="Account created successfully")
        return error_response(message="Registration failed", errors=serializer.errors)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={200: UserProfileSerializer},
        tags=["Auth"],
        summary="Get current user profile",
    )
    def get(self, request):
        data = UserProfileSerializer(request.user).data
        return success_response(data=data)


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=UpdateProfileSerializer,
        responses={200: UserProfileSerializer},
        tags=["Auth"],
        summary="Update user profile",
    )
    def put(self, request):
        serializer = UpdateProfileSerializer(
            request.user, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            data = UserProfileSerializer(request.user).data
            return success_response(data=data, message="Profile updated")
        return error_response(message="Update failed", errors=serializer.errors)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Auth"], summary="Logout (blacklist refresh token)")
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return success_response(message="Logged out successfully")
        except Exception:
            return error_response(message="Invalid token")
