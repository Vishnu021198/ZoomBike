from django.db import models
from owner.models import Owner

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

    def __str__(self):
        return f"{self.brand.name} - {self.model.name} ({self.registration_number})"
