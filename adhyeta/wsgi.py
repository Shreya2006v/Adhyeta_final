"""WSGI config for traditional HTTP deployment."""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "adhyeta.settings.dev")
application = get_wsgi_application()
