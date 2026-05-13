"""Development settings — SQLite, DEBUG=True."""
from .base import *  # noqa

DEBUG = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "adhyeta.db",
    }
}

# Allow all hosts in dev
ALLOWED_HOSTS = ["*"]
