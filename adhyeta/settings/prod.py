"""Production settings — PostgreSQL, DEBUG=False, whitenoise."""
from .base import *  # noqa
import dj_database_url  # type: ignore

DEBUG = False

# ─── Database ─────────────────────────────────────────────────────────────────
DATABASE_URL = config("DATABASE_URL", default="")  # noqa: F821
if DATABASE_URL:
    DATABASES = {"default": dj_database_url.parse(DATABASE_URL, conn_max_age=600)}
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": config("DB_NAME", default="adhyeta_db"),  # noqa: F821
            "USER": config("DB_USER", default="postgres"),  # noqa: F821
            "PASSWORD": config("DB_PASSWORD", default=""),  # noqa: F821
            "HOST": config("DB_HOST", default="localhost"),  # noqa: F821
            "PORT": config("DB_PORT", default="5432"),  # noqa: F821
        }
    }

# ─── Static files via whitenoise ──────────────────────────────────────────────
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")  # noqa: F821
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
