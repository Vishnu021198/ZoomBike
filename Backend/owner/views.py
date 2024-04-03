from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from owner.renderers import UserRenderer
from .models import Owner
from .serializers import OwnerRegistrationSerializer, OwnerLoginSerializer, VerifyAccountSerializer, OwnerSerializer, OwnerProfileSerializer, BookingSerializer
from owner.emails import *
from rest_framework.permissions import AllowAny
from bike.models import Bike, Booking
from bike.serializers import BikeSerializer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class OwnerRegistrationView(APIView):
    permission_classes=[AllowAny]
    def post(self, request, format=None):
        serializer = OwnerRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            send_otp_via_mail(serializer.data['email'])
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTP(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        try:
            data = request.data
            serializer = VerifyAccountSerializer(data = data)
            if serializer.is_valid(raise_exception=True):
                email = serializer.data['email']
                otp = serializer.data['otp']
                owner_queryset = Owner.objects.filter(email=email)

                if not owner_queryset.exists():
                    return Response({
                        'status': 400,
                        'message': 'Invalid Email',
                        'data': 'Invalid Email'
                    })
                
                owner = owner_queryset.first()

                if owner is None:
                    return Response({
                        'status': 400,
                        'message': 'Invalid Email',
                        'data': 'Invalid Email'
                    })
                
         
                serializer = OwnerLoginSerializer(owner, data={'is_active': True}, partial=True)
                if serializer.is_valid():
                    serializer.save()

                return Response({'msg': 'Account Verified'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': 'Something went wrong'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        

class OwnerLoginView(APIView):
    permission_classes=[AllowAny]
    renderer_class = [UserRenderer]
    def post(self, request, format=None):
        serializer = OwnerLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            print(user,"USER")
            if user is not None:
                token = get_tokens_for_user(user)
                print(token,"tokennnnn")
                return Response({'token':token,'msg':'Login Success'},
                    status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}},
                    status=status.HTTP_404_NOT_FOUND)
            

            

class OwnerProfileView(APIView):
    permission_classes = [AllowAny]  # Ensure user is authenticated

    def get(self, request):
        user = request.user  # Get the authenticated user
        try:
            owner = Owner.objects.get(email=user.email)  # Fetch the owner object corresponding to the user's email
            serializer = OwnerProfileSerializer(owner)  # Serialize the owner object
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Owner.DoesNotExist:
            return Response({"error": "Owner details not found"}, status=status.HTTP_404_NOT_FOUND)
        
class OwnerProfileUpdateView(APIView):
    
    def put(self, request, id):  
        try:
            owner = Owner.objects.get(id=id) 
        except Owner.DoesNotExist:
            return Response({"error": "Owner not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = OwnerProfileSerializer(owner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("Success")
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class OwnerBookingListView(APIView):
    
    def get(self, request, id):
        owner = Owner.objects.get(id=id)
        print("Owner", owner)
        bookings = Booking.objects.filter(owner=owner, is_paid=True)
        serializer = BookingSerializer(bookings, many=True)

        for booking in serializer.data:
            bike_id = booking['bike'] 
            bike = Bike.objects.get(pk=bike_id)
            bike_serializer = BikeSerializer(bike)
            booking['bike_details'] = bike_serializer.data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
        
    
