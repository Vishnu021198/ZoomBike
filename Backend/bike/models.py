from django.db import models
from owner.models import Owner
from account.models import User

class BikeBrand(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class BikeModel(models.Model):
    brand = models.ForeignKey(BikeBrand, on_delete=models.CASCADE)
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.brand.name} - {self.name}"

class Bike(models.Model):

    CITY_CHOICES = [
        ('Kasaragod', 'Kasaragod'),
        ('Kannur', 'Kannur'),
        ('Wayanad', 'Wayanad'),
        ('Kozhikode', 'Kozhikode'),
        ('Palakkad', 'Palakkad'),
        ('Thrissur', 'Thrissur'),
        ('Ernakulam', 'Ernakulam'),
        ('Idukki', 'Idukki'),
        ('Malappuram', 'Malappuram'),
        ('Kottayam', 'Kottayam'),
        ('Thiruvananthapuram', 'Thiruvananthapuram'),
        ('Kollam', 'Kollam'),
        ('Alappuzha', 'Alappuzha'),
        ('Pathanamthitta', 'Pathanamthitta'),
    ]

    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    owner_name = models.CharField(max_length=200)
    owner_phone_number = models.CharField(max_length=15)
    brand = models.ForeignKey(BikeBrand, on_delete=models.CASCADE)
    model = models.ForeignKey(BikeModel, on_delete=models.CASCADE)
    registration_number = models.CharField(max_length=15)
    km_driven = models.PositiveIntegerField()
    year_of_registration = models.PositiveIntegerField()
    city = models.CharField(max_length=50, choices=CITY_CHOICES)
    images = models.ImageField(upload_to='bike_images/', blank=True, null=True)
    bike_rent = models.PositiveIntegerField()
    available_from = models.DateField()
    available_to = models.DateField()

    def __str__(self):
        return f"{self.brand.name} - {self.model.name} ({self.registration_number})"


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bike = models.ForeignKey(Bike, on_delete=models.CASCADE)
    pickup_date = models.DateField()
    drop_date = models.DateField()
    number_of_days = models.PositiveIntegerField()
    city = models.CharField(max_length=50)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    aadhar_number = models.CharField(max_length=12)
    is_paid = models.BooleanField(default=False)
    is_canceled = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.bike.brand.name} {self.bike.model.name} - {self.pickup_date} to {self.drop_date}"