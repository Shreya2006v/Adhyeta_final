from django.urls import path
from . import views

urlpatterns = [
    path('colleges/', views.CollegeListView.as_view(), name='college-list'),
    path('branches/', views.BranchListView.as_view(), name='branch-list'),
]
