"""
AI quiz generation using Gemini Free API.
Generates MCQs with explanations for mock tests.
"""
import json
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

MOCK_QUESTIONS = [
    {
        "question": "What is the time complexity of binary search?",
        "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        "correct_index": 1,
        "explanation": "Binary search repeatedly halves the search space, giving O(log n) complexity.",
        "topic": "Algorithms",
        "difficulty": "medium",
    },
    {
        "question": "Which data structure uses LIFO order?",
        "options": ["Queue", "Stack", "Heap", "Tree"],
        "correct_index": 1,
        "explanation": "A stack uses Last-In-First-Out (LIFO) order where the last element pushed is the first to be popped.",
        "topic": "Data Structures",
        "difficulty": "easy",
    },
    {
        "question": "What does OOP stand for?",
        "options": [
            "Object Oriented Programming",
            "Only One Process",
            "Open Output Protocol",
            "Optimized Object Processing",
        ],
        "correct_index": 0,
        "explanation": "OOP stands for Object-Oriented Programming, a paradigm based on objects and classes.",
        "topic": "Programming Concepts",
        "difficulty": "easy",
    },
]


def generate_quiz(subject: str, topics: str, difficulty: str, num_questions: int) -> list:
    """Generate MCQ questions using Groq (primary) or Gemini API."""
    try:
        from langchain_groq import ChatGroq
        from langchain_google_genai import ChatGoogleGenerativeAI
        from langchain_core.messages import HumanMessage

        llm = None
        if settings.GROQ_API_KEY:
            llm = ChatGroq(
                api_key=settings.GROQ_API_KEY,
                model=settings.GROQ_MODEL,
                temperature=0.8,
            )
        elif settings.GEMINI_API_KEY:
            llm = ChatGoogleGenerativeAI(
                google_api_key=settings.GEMINI_API_KEY,
                model=settings.GEMINI_MODEL,
                temperature=0.8,
            )

        if not llm:
            raise ValueError("No AI API keys configured")

        prompt = f"""Generate {num_questions} multiple-choice questions for a student studying {subject}.
Topics to cover: {topics or subject}.
Difficulty level: {difficulty}.

Return ONLY a valid JSON array with this exact structure:
[
  {{
    "question": "The question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_index": 0,
    "explanation": "Clear explanation of why the answer is correct",
    "topic": "Specific topic this question covers",
    "difficulty": "{difficulty}"
  }}
]

Make questions educational, clear, and appropriate for the difficulty level.
Ensure exactly 4 options per question and correct_index is 0-3."""

        response = llm.invoke([HumanMessage(content=prompt)])
        content = response.content.strip()

        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()

        questions = json.loads(content)
        return questions[:num_questions]

    except Exception as e:
        logger.error(f"Quiz generation error: {e}")
        # Return mock questions as fallback
        return (MOCK_QUESTIONS * ((num_questions // len(MOCK_QUESTIONS)) + 1))[:num_questions]


def analyze_attempt(test, answers: dict, questions: list) -> dict:
    """Analyze test answers and return results with weak topics."""
    correct = 0
    wrong_topics = []
    results = []

    for i, question in enumerate(questions):
        selected = answers.get(str(i))
        is_correct = selected == question.get("correct_index")
        if is_correct:
            correct += 1
        else:
            wrong_topics.append(question.get("topic", "General"))

        results.append(
            {
                "question_index": i,
                "question": question["question"],
                "selected": selected,
                "correct_index": question.get("correct_index"),
                "is_correct": is_correct,
                "explanation": question.get("explanation", ""),
                "topic": question.get("topic", ""),
            }
        )

    score = round(correct / len(questions) * 100, 1) if questions else 0

    # Adaptive difficulty suggestion
    next_difficulty = test.difficulty
    if score >= 80:
        next_difficulty = {"easy": "medium", "medium": "hard", "hard": "hard"}[test.difficulty]
    elif score <= 40:
        next_difficulty = {"easy": "easy", "medium": "easy", "hard": "medium"}[test.difficulty]

    return {
        "score": score,
        "correct_count": correct,
        "total_questions": len(questions),
        "wrong_topics": list(set(wrong_topics)),
        "results": results,
        "next_difficulty": next_difficulty,
        "suggestions": [
            f"Review {topic} to strengthen your understanding" for topic in set(wrong_topics)
        ],
    }
