from django.contrib import admin
from .models import BikeBrand, BikeModel, Bike, Booking

# Register your models here.

admin.site.register(BikeBrand)
admin.site.register(BikeModel)
admin.site.register(Bike)
admin.site.register(Booking)