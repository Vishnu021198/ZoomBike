from rest_framework import serializers
from .models import Owner

class OwnerRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    
    class Meta:
        model = Owner
        fields = ['email', 'name', 'phone_number', 'password', 'password2', 'bike_license_number']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password Doesn't match")
        return attrs

    def create(self, validated_data):
        return Owner.objects.create_user(**validated_data)

class VerifyAccountSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()

class OwnerLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = Owner
        fields = ['email','password']


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['email', 'name', 'phone_number', 'bike_license_number', 'is_verified', 'is_active', 'is_staff', 'created_at', 'updated_at']


class OwnerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', 'email', 'name', 'phone_number', 'bike_license_number']
