from django.urls import path, include
from account.views import BookingCreateView, UserRegistraionView, UserLoginView, VerifyOTP, Home, BikeList, UserProfileView, BikeDetailView, CheckAvailabilityView, UserProfileUpdateView
from . import views 

urlpatterns = [
    path('home/', Home.as_view(), name='home'),
    path('register/', UserRegistraionView.as_view(),name='register'),
    path('verify/', VerifyOTP.as_view(),name='verify'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('google-login/', views.google_login, name='google-login'),
    path('register-google/', views.register_user_with_google, name='register_google'),
    path('bike-list/', BikeList.as_view(), name='bike-list'),
    path('user-navbar/', UserProfileView.as_view(), name='user-navbar'),
    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('user-profile/update/', UserProfileUpdateView.as_view(), name='user-profile-update'),
    path('bike-detail/<int:bikeId>/', BikeDetailView.as_view(), name='bike-detail'),
    path('check-availability/', CheckAvailabilityView.as_view(), name='check_availability'),
    path('create-booking/', BookingCreateView.as_view(), name='create-booking'),






    # path('profile/', UserProfileView.as_view(), name='profile'),
    # path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    # path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    # path('reset-password/<uid>/<token>', UserPasswordResetView.as_view(), name='reset-password'),
]
