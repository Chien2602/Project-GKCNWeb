from django.urls import path
from .views import RegisterAPIView, LoginAPIView, UserInfoAPIView, ChangePasswordAPIView, LogoutAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path("login/", LoginAPIView.as_view(), name="login"),
    path('user-info/', UserInfoAPIView.as_view(), name='user-info'),
    path("change-password/", ChangePasswordAPIView.as_view(), name="change-password"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
]
