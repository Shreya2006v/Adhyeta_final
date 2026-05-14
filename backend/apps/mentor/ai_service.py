"""
AI service layer — LangChain + Groq (primary) + Gemini (fallback).
All AI interactions go through this module.
"""
import json
import uuid
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

# LangChain state
LANGCHAIN_AVAILABLE = None  # Lazy check

def _ensure_langchain():
    """Lazily verify if LangChain is usable on this environment."""
    global LANGCHAIN_AVAILABLE
    if LANGCHAIN_AVAILABLE is not None:
        return LANGCHAIN_AVAILABLE

    try:
        from langchain_groq import ChatGroq
        from langchain_google_genai import ChatGoogleGenerativeAI
        from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
        LANGCHAIN_AVAILABLE = True
    except Exception as e:
        logger.warning(f"LangChain initialization failed (likely Python version compatibility): {e}")
        LANGCHAIN_AVAILABLE = False
    return LANGCHAIN_AVAILABLE


def _get_llm(prefer_groq: bool = True):
    """Return an LLM client, preferring Groq, falling back to Gemini."""
    if not _ensure_langchain():
        return None

    from langchain_groq import ChatGroq
    from langchain_google_genai import ChatGoogleGenerativeAI

    if prefer_groq and settings.GROQ_API_KEY:
        try:
            return ChatGroq(
                api_key=settings.GROQ_API_KEY,
                model=settings.GROQ_MODEL,
                temperature=0.7,
                max_tokens=2048,
            )
        except Exception as e:
            logger.warning(f"Groq init failed: {e}")

    if settings.GEMINI_API_KEY:
        try:
            return ChatGoogleGenerativeAI(
                google_api_key=settings.GEMINI_API_KEY,
                model=settings.GEMINI_MODEL,
                temperature=0.7,
            )
        except Exception as e:
            logger.warning(f"Gemini init failed: {e}")

    return None


def _build_system_prompt(user, weak_topics=None) -> str:
    """Build a context-rich system prompt for the AI mentor."""
    weak_str = ""
    if weak_topics:
        topics = ", ".join([f"{t.topic} ({t.subject})" for t in weak_topics[:5]])
        weak_str = f"\nThe student's current weak areas are: {topics}."

    return f"""You are ADHYETA, an intelligent and empathetic AI learning mentor.
You are helping {user.full_name}, a student with {user.xp_points} XP points and a {user.streak_count}-day study streak.
{weak_str}

Your responsibilities:
- Explain concepts clearly with examples
- Give motivating, personalized responses
- Identify knowledge gaps and suggest improvements
- Format answers in clean markdown (use headings, bullets, code blocks)
- Keep responses focused and concise unless asked for more detail
- Always end with an encouraging message or a follow-up question

Remember: You are their personal learning companion, not just an AI."""


MOCK_RESPONSE = """## Great question! 🚀

I'd love to help you with that. Here's a clear explanation:

**Key Concept:**
This is a demonstration response since no AI API key is configured yet.

**To enable real AI responses:**
1. Get a free Groq API key from [console.groq.com](https://console.groq.com)
2. Add `GROQ_API_KEY=your-key` to your `.env` file
3. Restart the server

**Next Steps:**
- Try asking me about any topic you're studying
- I'll create personalized explanations based on your learning history

Keep up the great work! 💪"""


def mentor_chat(user, message: str, session_id: str, history: list) -> str:
    """
    Process a chat message and return AI response.
    history: list of AIChatHistory objects (last N messages)
    """
    llm = _get_llm()
    if not llm:
        return MOCK_RESPONSE

    from apps.mentor.models import WeakTopic
    weak_topics = WeakTopic.objects.filter(user=user).order_by("mastery_score")[:5]

    from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
    system_prompt = _build_system_prompt(user, weak_topics)
    messages = [SystemMessage(content=system_prompt)]

    # Add recent history (last 10 exchanges)
    for msg in history[-20:]:
        if msg.role == "user":
            messages.append(HumanMessage(content=msg.content))
        else:
            messages.append(AIMessage(content=msg.content))

    messages.append(HumanMessage(content=message))

    try:
        response = llm.invoke(messages)
        return response.content
    except Exception as e:
        logger.error(f"AI mentor error: {e}")
        return f"I'm having a brief technical issue. Please try again in a moment. 🙏\n\n*Error: {str(e)[:100]}*"


def generate_study_plan(user, subject: str, duration_weeks: int = 4) -> dict:
    """Generate a structured study plan using AI."""
    llm = _get_llm()
    if not llm:
        return _mock_study_plan(subject, duration_weeks)

    from apps.mentor.models import WeakTopic
    weak_topics = WeakTopic.objects.filter(user=user, subject__iexact=subject)
    weak_str = ", ".join([t.topic for t in weak_topics[:5]]) or "none identified yet"

    prompt = f"""Create a detailed {duration_weeks}-week study plan for a student studying {subject}.
The student's weak areas in this subject are: {weak_str}.

Return ONLY a valid JSON object with this exact structure:
{{
  "subject": "{subject}",
  "duration_weeks": {duration_weeks},
  "weekly_goals": [
    {{
      "week": 1,
      "theme": "Week theme/focus",
      "topics": ["topic1", "topic2"],
      "daily_tasks": [
        {{"day": "Monday", "task": "Task description", "duration_minutes": 45}},
        {{"day": "Tuesday", "task": "Task description", "duration_minutes": 45}}
      ],
      "resources": ["resource1", "resource2"]
    }}
  ],
  "revision_strategy": "Brief revision strategy",
  "tips": ["tip1", "tip2"]
}}"""

    from langchain_core.messages import HumanMessage

    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        # Extract JSON from response
        content = response.content.strip()
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
        return json.loads(content)
    except Exception as e:
        logger.error(f"Study plan generation error: {e}")
        return _mock_study_plan(subject, duration_weeks)


def _mock_study_plan(subject: str, weeks: int) -> dict:
    return {
        "subject": subject,
        "duration_weeks": weeks,
        "weekly_goals": [
            {
                "week": i + 1,
                "theme": f"Week {i + 1}: Foundation & Practice",
                "topics": [f"{subject} Core Concept {i*2+1}", f"{subject} Core Concept {i*2+2}"],
                "daily_tasks": [
                    {"day": "Monday", "task": f"Study {subject} basics", "duration_minutes": 45},
                    {"day": "Wednesday", "task": "Practice problems", "duration_minutes": 45},
                    {"day": "Friday", "task": "Review and notes", "duration_minutes": 30},
                ],
                "resources": ["NCERT Textbook", "Khan Academy", "YouTube lectures"],
            }
            for i in range(weeks)
        ],
        "revision_strategy": "Review each week's topics on Sunday using active recall.",
        "tips": [
            "Use spaced repetition for better retention",
            "Take short breaks every 45 minutes",
            "Test yourself regularly with practice questions",
        ],
    }
