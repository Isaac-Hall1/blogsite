web: cd backend && gunicorn backend.wsgi:application --log-file -
release: python backend/manage.py makemigrations --noinput && python backend/manage.py migrate --noinput

