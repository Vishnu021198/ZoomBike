from django.urls import path
from .views import OwnerRegistrationView, OwnerLoginView, VerifyOTP, OwnerProfileView

urlpatterns = [
    path('register/', OwnerRegistrationView.as_view(), name='owner-register'),
    path('verify/', VerifyOTP.as_view(),name='verify'),
    path('login/', OwnerLoginView.as_view(), name='owner-login'),
    path('owner_profile/', OwnerProfileView.as_view(), name='owner_profile'),
    path('edit_owner_profile/', OwnerProfileView.as_view(), name='edit_owner_profile'),
]
