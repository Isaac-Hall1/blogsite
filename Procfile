web: gunicorn backend.backend.wsgi --bind 0.0.0.0:$PORT
release: python backend/manage.py makemigrations --noinput && python backend/manage.py migrate --noinput

