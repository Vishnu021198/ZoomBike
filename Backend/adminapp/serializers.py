from rest_framework import serializers
from account.models import User
from owner.models import Owner


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  

class OwnerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'  