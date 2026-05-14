"""
Standard API response helpers.
All ADHYETA endpoints return:
  {"success": bool, "message": str, "data": any}
"""
from rest_framework.response import Response
from rest_framework import status as http_status


def success_response(data=None, message="Success", status=http_status.HTTP_200_OK):
    return Response(
        {"success": True, "message": message, "data": data},
        status=status,
    )


def error_response(message="Something went wrong", errors=None, status=http_status.HTTP_400_BAD_REQUEST):
    payload = {"success": False, "message": message}
    if errors:
        payload["errors"] = errors
    return Response(payload, status=status)


def created_response(data=None, message="Created successfully"):
    return success_response(data=data, message=message, status=http_status.HTTP_201_CREATED)


def not_found_response(message="Resource not found"):
    return error_response(message=message, status=http_status.HTTP_404_NOT_FOUND)


def unauthorized_response(message="Authentication required"):
    return error_response(message=message, status=http_status.HTTP_401_UNAUTHORIZED)


def forbidden_response(message="You do not have permission to perform this action"):
    return error_response(message=message, status=http_status.HTTP_403_FORBIDDEN)
