from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class OwnerManager(BaseUserManager):
    def create_user(self, email, name, password=None, password2=None, bike_license_number=None, phone_number=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            phone_number=phone_number,
            bike_license_number=bike_license_number,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user



class Owner(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15, blank=False, null=False)
    bike_license_number = models.CharField(max_length=13)

    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = OwnerManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "phone_number", "bike_license_number"]

    def __str__(self):
        return self.email