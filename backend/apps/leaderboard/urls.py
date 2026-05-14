from django.urls import path
from .views import GlobalLeaderboardView, WeeklyLeaderboardView, MyRankView

urlpatterns = [
    path("global/", GlobalLeaderboardView.as_view(), name="leaderboard-global"),
    path("weekly/", WeeklyLeaderboardView.as_view(), name="leaderboard-weekly"),
    path("my-rank/", MyRankView.as_view(), name="my-rank"),
]
