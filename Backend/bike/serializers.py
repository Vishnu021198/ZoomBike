from rest_framework import serializers
from .models import Bike, BikeBrand, BikeModel

class BikeBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = BikeBrand
        fields = ['id', 'name']

class BikeModelSerializer(serializers.ModelSerializer):
    brand = BikeBrandSerializer()

    class Meta:
        model = BikeModel
        fields = ['id', 'brand', 'name']

class BikeSerializer(serializers.ModelSerializer):
    brand = BikeBrandSerializer()
    model = BikeModelSerializer()

    class Meta:
        model = Bike
        fields = ['id', 'brand', 'model', 'registration_number', 'km_driven', 'year_of_registration', 'city', 'bike_rent', 'images']
