from django.urls import path
from .views import OwnerRegistrationView, OwnerLoginView, VerifyOTP, OwnerProfileView, OwnerProfileUpdateView

urlpatterns = [
    path('register/', OwnerRegistrationView.as_view(), name='owner-register'),
    path('verify/', VerifyOTP.as_view(),name='verify'),
    path('login/', OwnerLoginView.as_view(), name='owner-login'),
    path('owner_profile/', OwnerProfileView.as_view(), name='owner_profile'),
    path('owner-profile/update/<int:id>/', OwnerProfileUpdateView.as_view(), name='owner-profile-update'),
]
