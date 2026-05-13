# ADHYETA Backend

> **"Learn how your brain works. Then learn everything else."**

An AI-powered cognitive learning platform backend built with **Django 5** + **DRF** + **LangChain** + **Django Channels**.

---

## 🚀 Quick Start (5 minutes)

### 1. Clone & Setup Environment
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements/dev.txt
```

### 2. Configure Environment
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your FREE API keys:
# GROQ_API_KEY=your-key  ← from console.groq.com (free)
# GEMINI_API_KEY=your-key ← from aistudio.google.com (free)
```

### 3. Run Migrations & Seed Data
```bash
python manage.py migrate
python seed.py
```

### 4. Create Superuser (optional, already in seed)
```bash
python manage.py createsuperuser
```

### 5. Start the Server
```bash
# HTTP only (simpler)
python manage.py runserver

# ASGI with WebSockets (recommended)
daphne adhyeta.asgi:application
```

### 6. Explore the API
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **Django Admin**: http://localhost:8000/admin/

---

## 🔐 Demo Credentials

| Role    | Email                    | Password   |
|---------|--------------------------|------------|
| Student | student@adhyeta.dev      | demo1234   |
| Teacher | teacher@adhyeta.dev      | demo1234   |
| Admin   | admin@adhyeta.dev        | admin1234  |

---

## 📁 Project Structure

```
eduai-backend/
├── adhyeta/                  ← Django project settings
│   ├── settings/
│   │   ├── base.py           ← shared config
│   │   ├── dev.py            ← SQLite, DEBUG=True
│   │   └── prod.py           ← PostgreSQL, production
│   ├── urls.py               ← root URL config
│   └── asgi.py               ← WebSocket entry point
│
├── apps/
│   ├── accounts/             ← Auth, JWT, Custom User
│   ├── dashboard/            ← XP, streaks, sessions
│   ├── mentor/               ← AI Mentor (Groq + Gemini)
│   ├── focus/                ← Pomodoro timer sessions
│   ├── mocktest/             ← AI-generated MCQ tests
│   ├── leaderboard/          ← XP rankings
│   ├── analytics/            ← Performance analytics
│   ├── cognitive/            ← Knowledge graph (NetworkX)
│   └── notifications/        ← In-app notifications
│
├── core/                     ← Shared utilities
│   ├── response.py           ← Standard API responses
│   ├── permissions.py        ← Role-based permissions
│   ├── pagination.py         ← Custom paginator
│   └── mixins.py             ← TimestampMixin
│
├── websockets/               ← Django Channels consumers
│   ├── consumers.py          ← Focus, Leaderboard, Notifications
│   └── routing.py            ← WebSocket URL routing
│
├── seed.py                   ← Demo data seeder
├── Dockerfile
├── docker-compose.yml
└── render.yaml               ← Render.com deployment
```

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login → JWT tokens |
| POST | `/api/auth/refresh/` | Refresh access token |
| POST | `/api/auth/logout/` | Blacklist refresh token |
| GET | `/api/auth/me/` | Current user profile |
| PUT | `/api/auth/profile/update/` | Update profile |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/overview/` | XP, streak, sessions summary |
| GET/POST | `/api/dashboard/study-sessions/` | List/create study sessions |
| GET | `/api/dashboard/heatmap/` | 90-day activity heatmap |
| GET | `/api/dashboard/xp-history/` | XP earned per day |

### AI Mentor
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/mentor/chat/` | Chat with AI mentor |
| GET | `/api/mentor/history/` | Chat history |
| POST/GET | `/api/mentor/study-plan/` | Generate/get study plans |
| GET | `/api/mentor/weak-topics/` | Identified weak topics |

### Focus Sessions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/focus/start/` | Start focus session |
| POST | `/api/focus/end/` | End focus session |
| GET | `/api/focus/sessions/` | List sessions |
| GET | `/api/focus/analytics/` | Focus statistics |

### Mock Tests
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/mocktest/generate/` | Generate AI MCQ test |
| POST | `/api/mocktest/submit/` | Submit answers |
| GET | `/api/mocktest/results/<id>/` | Detailed results |
| GET | `/api/mocktest/history/` | Past attempts |

### Leaderboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leaderboard/global/` | Top 50 all-time |
| GET | `/api/leaderboard/weekly/` | This week's top students |
| GET | `/api/leaderboard/my-rank/` | Your current rank |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/subject-mastery/` | Per-subject mastery |
| GET | `/api/analytics/performance-trend/` | Score trends |
| GET | `/api/analytics/weak-areas/` | Topics needing work |

### Cognitive Map
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cognitive/map/` | Full graph JSON (Three.js) |
| POST | `/api/cognitive/update/` | Update node mastery |
| POST | `/api/cognitive/initialize/` | Init subject graph |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications/` | List notifications |
| POST | `/api/notifications/<id>/read/` | Mark as read |
| POST | `/api/notifications/mark-all-read/` | Mark all read |

---

## ⚡ WebSocket Endpoints

| URL | Description |
|-----|-------------|
| `ws://localhost:8000/ws/focus/<user_id>/` | Focus timer sync |
| `ws://localhost:8000/ws/leaderboard/` | Live rank updates |
| `ws://localhost:8000/ws/notifications/<user_id>/` | Push notifications |

---

## 🤖 AI Features

### AI Mentor (LangChain + Groq)
- Uses `llama-3.3-70b-versatile` via **Groq** (primary)
- Falls back to `gemini-2.0-flash` if Groq unavailable
- Remembers last 20 messages per session
- Context-aware: includes user's weak topics and XP
- Returns **markdown** responses

### Quiz Generation (Gemini)
- Generates MCQs via **Gemini Free API**
- Adaptive difficulty (increases on high scores, decreases on low)
- Per-question AI explanations
- Falls back to sample questions if no API key

### Works Without API Keys!
All AI features have intelligent mock fallbacks so the app runs and demos perfectly even without API keys configured.

---

## 🐳 Docker

```bash
# Build and run
docker-compose up --build

# Run migrations inside container
docker-compose exec web python manage.py migrate
docker-compose exec web python seed.py
```

---

## 🚀 Deploy to Render (Free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Render auto-detects `render.yaml`
5. Add your environment variables in Render dashboard
6. Deploy!

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Django 5 + Django REST Framework |
| Auth | JWT (djangorestframework-simplejwt) |
| Realtime | Django Channels + WebSockets |
| AI Primary | Groq API (llama-3.3-70b) |
| AI Fallback | Google Gemini Flash |
| AI Framework | LangChain |
| Graph Engine | NetworkX |
| API Docs | drf-spectacular (OpenAPI 3.0) |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Deployment | Daphne ASGI + Render/Railway |

---

## 📞 Standard API Response Format

All endpoints return:
```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Errors return:
```json
{
  "success": false,
  "message": "Error description",
  "errors": {}
}
```

---

Built with ❤️ for ADHYETA — *An AI-powered cognitive learning operating system for students.*
