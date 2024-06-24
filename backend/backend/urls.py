from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, DeleteUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/user/delete/<int:pk>', DeleteUserView.as_view(), name='delete-user'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_view'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name = 'refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
]
