from rest_framework import serializers
from account.models import User
from owner.models import Owner
from bike.models import Booking
from bike.serializers import BikeSerializer


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  

class OwnerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'  

class TransactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'