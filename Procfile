web: gunicorn backend.backend.wsgi --log-file -
release: python backend/manage.py makemigrations --noinput && python backend/manage.py migrate --noinput

