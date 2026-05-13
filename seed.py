"""
ADHYETA Demo Data Seeder
Run with: python seed.py

Creates:
  - 3 users (student, teacher, admin)
  - Study sessions, focus sessions
  - Mock tests with sample questions
  - Leaderboard entries
  - Cognitive map nodes
  - Notifications
"""
import os
import sys
import django
from datetime import datetime, timedelta, date
import random

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "adhyeta.settings.dev")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from django.utils import timezone
from apps.accounts.models import CustomUser
from apps.dashboard.models import StudySession, DailyStreak
from apps.focus.models import FocusSession
from apps.mocktest.models import MockTest, MockTestAttempt
from apps.leaderboard.models import LeaderboardEntry
from apps.analytics.models import SubjectMastery
from apps.cognitive.models import CognitiveNode, CognitiveEdge
from apps.notifications.models import Notification
from apps.mentor.models import AIChatHistory, WeakTopic, StudyPlan

print("Seeding ADHYETA demo data...")

# ── 1. Users ─────────────────────────────────────────────────────────────────
print("  Creating users...")

student, _ = CustomUser.objects.get_or_create(
    email="student@adhyeta.dev",
    defaults={
        "username": "arjun_sharma",
        "full_name": "Arjun Sharma",
        "role": "student",
        "xp_points": 1250,
        "streak_count": 7,
        "last_active": date.today(),
    },
)
student.set_password("demo1234")
student.save()

teacher, _ = CustomUser.objects.get_or_create(
    email="teacher@adhyeta.dev",
    defaults={
        "username": "priya_teacher",
        "full_name": "Dr. Priya Nair",
        "role": "teacher",
        "xp_points": 500,
        "streak_count": 3,
    },
)
teacher.set_password("demo1234")
teacher.save()

admin_user, _ = CustomUser.objects.get_or_create(
    email="admin@adhyeta.dev",
    defaults={
        "username": "adhyeta_admin",
        "full_name": "ADHYETA Admin",
        "role": "admin",
        "is_staff": True,
        "is_superuser": True,
    },
)
admin_user.set_password("admin1234")
admin_user.save()

print(f"  - Created {CustomUser.objects.count()} users")

# ── 2. Study Sessions ─────────────────────────────────────────────────────────
print("  Creating study sessions...")
subjects = ["Mathematics", "Physics", "Chemistry", "Computer Science"]
for i in range(14):
    start = timezone.now() - timedelta(days=i, hours=random.randint(1, 8))
    end = start + timedelta(minutes=random.randint(30, 90))
    StudySession.objects.get_or_create(
        user=student,
        subject=random.choice(subjects),
        start_time=start,
        defaults={
            "end_time": end,
            "topic": f"Topic {i+1}",
            "session_type": random.choice(["study", "revision", "practice"]),
        },
    )

# ── 3. Daily Streaks ─────────────────────────────────────────────────────────
for i in range(7):
    DailyStreak.objects.get_or_create(
        user=student,
        date=date.today() - timedelta(days=i),
        defaults={"sessions_count": random.randint(1, 3), "total_minutes": random.randint(30, 120)},
    )

print(f"  - Created study sessions and streaks")

# ── 4. Focus Sessions ─────────────────────────────────────────────────────────
print("  Creating focus sessions...")
for i in range(5):
    start = timezone.now() - timedelta(hours=i * 3)
    FocusSession.objects.get_or_create(
        user=student,
        start_time=start,
        defaults={
            "session_type": "pomodoro",
            "target_minutes": 25,
            "actual_minutes": random.randint(20, 25),
            "completed": True,
            "end_time": start + timedelta(minutes=25),
        },
    )

# ── 5. Mock Tests ─────────────────────────────────────────────────────────────
print("  Creating mock tests...")
sample_questions = [
    {
        "question": "What is Newton's First Law of Motion?",
        "options": [
            "An object at rest stays at rest unless acted upon by a force",
            "Force equals mass times acceleration",
            "Every action has an equal and opposite reaction",
            "Energy can neither be created nor destroyed",
        ],
        "correct_index": 0,
        "explanation": "Newton's First Law (Inertia): An object remains at rest or in uniform motion unless an external force acts upon it.",
        "topic": "Newton's Laws",
        "difficulty": "easy",
    },
    {
        "question": "What is the derivative of sin(x)?",
        "options": ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"],
        "correct_index": 0,
        "explanation": "The derivative of sin(x) is cos(x). This is a fundamental calculus rule.",
        "topic": "Derivatives",
        "difficulty": "medium",
    },
    {
        "question": "What does CPU stand for?",
        "options": [
            "Central Processing Unit",
            "Computer Processing Unit",
            "Control Processing Utility",
            "Central Program Unit",
        ],
        "correct_index": 0,
        "explanation": "CPU stands for Central Processing Unit, the primary component of a computer that executes instructions.",
        "topic": "Computer Basics",
        "difficulty": "easy",
    },
]

test, _ = MockTest.objects.get_or_create(
    user=student,
    subject="Physics",
    defaults={
        "difficulty": "medium",
        "num_questions": 3,
        "questions_json": sample_questions,
        "time_limit_minutes": 10,
    },
)

MockTestAttempt.objects.get_or_create(
    test=test,
    user=student,
    defaults={
        "answers_json": {"0": 0, "1": 0, "2": 0},
        "score": 100.0,
        "correct_count": 3,
        "time_taken_minutes": 7,
        "completed_at": timezone.now(),
        "analysis_json": {"score": 100, "wrong_topics": [], "suggestions": []},
    },
)

print("  - Created mock tests and attempts")

# ── 6. Leaderboard ───────────────────────────────────────────────────────────
print("  Building leaderboard...")
for user, xp in [(student, 1250), (teacher, 500)]:
    entry, _ = LeaderboardEntry.objects.get_or_create(
        user=user,
        defaults={"xp_points": xp, "weekly_xp": random.randint(50, 200)},
    )
    entry.xp_points = xp
    entry.save()
LeaderboardEntry.recompute_ranks()

# ── 7. Subject Mastery ────────────────────────────────────────────────────────
mastery_data = [
    ("Mathematics", 72, 8, 75),
    ("Physics", 58, 5, 62),
    ("Chemistry", 45, 3, 48),
    ("Computer Science", 85, 10, 88),
]
for subj, score, sessions, test_avg in mastery_data:
    SubjectMastery.objects.get_or_create(
        user=student,
        subject=subj,
        defaults={
            "mastery_score": score,
            "sessions_count": sessions,
            "test_average": test_avg,
            "last_studied": date.today() - timedelta(days=random.randint(0, 5)),
        },
    )

# ── 8. Cognitive Map ─────────────────────────────────────────────────────────
print("  Creating cognitive map...")
from apps.cognitive.graph_engine import initialize_subject_graph
initialize_subject_graph(student, "mathematics")
initialize_subject_graph(student, "computer science")

# ── 9. Weak Topics ────────────────────────────────────────────────────────────
for topic, subj, score in [
    ("Integrals", "Mathematics", 35),
    ("Circuits", "Physics", 40),
    ("Chemical Bonding", "Chemistry", 28),
]:
    WeakTopic.objects.get_or_create(
        user=student, subject=subj, topic=topic,
        defaults={"mastery_score": score, "last_reviewed": date.today()},
    )

# ── 10. Notifications ─────────────────────────────────────────────────────────
print("  Creating notifications...")
notif_data = [
    ("7-Day Streak!", "Amazing! You've studied for 7 days in a row. Keep it up!", "achievement"),
    ("Study Plan Ready", "Your Mathematics study plan for 4 weeks is ready.", "info"),
    ("Mock Test Reminder", "You haven't taken a test in 3 days. Try one now!", "reminder"),
    ("New Achievement", "You earned the 'First 1000 XP' badge!", "success"),
]
for title, msg, ntype in notif_data:
    Notification.objects.get_or_create(
        user=student, title=title,
        defaults={"message": msg, "notification_type": ntype},
    )

# ── 11. Chat History ──────────────────────────────────────────────────────────
chat_data = [
    ("user", "Can you explain Newton's Laws of Motion?"),
    ("assistant", "## Newton's Laws of Motion\n\n**1st Law (Inertia):** An object stays at rest or moves at constant velocity unless acted upon by a force.\n\n**2nd Law (F=ma):** The force on an object equals its mass times acceleration.\n\n**3rd Law (Action-Reaction):** For every action, there is an equal and opposite reaction.\n\n*Example:* When you push a wall, the wall pushes back with equal force!"),
]
session_id = "demo-session-001"
for role, content in chat_data:
    AIChatHistory.objects.get_or_create(
        user=student, session_id=session_id, role=role,
        defaults={"content": content, "subject": "Physics"},
    )

print("\nSeed data complete!")
print("\nDemo Credentials:")
print("   Student:  student@adhyeta.dev / demo1234")
print("   Teacher:  teacher@adhyeta.dev / demo1234")
print("   Admin:    admin@adhyeta.dev   / admin1234")
print("\nSwagger Docs: http://localhost:8000/api/docs/")
