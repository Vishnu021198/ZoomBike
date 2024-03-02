from django.core.mail import send_mail
import random
from django.conf import settings
from .models import Owner



def send_otp_via_mail(email):
    subject = f'Welcome to ZoomBike!! - Verification Mail'
    otp = random.randint(100000, 999999)
    message = f'Your OTP is {otp}'
    email_from = settings.EMAIL_HOST
    send_mail(subject, message, email_from, [email])
    user_obj = Owner.objects.get(email = email)
    user_obj.otp = otp
    user_obj.save()
