from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, UserChangePasswordSerializer, UserPasswordResetSerializer, SendPasswordResetEmailSerializer, VerifyAccountSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from account.emails import *
from rest_framework.decorators import api_view, permission_classes
from bike.models import Bike
from bike.serializers import BikeSerializer
from django.utils import timezone
from datetime import datetime



def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistraionView(APIView):
    permission_classes = [AllowAny]
    renderer_class = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            send_otp_via_mail(serializer.data['email'])
            token = get_tokens_for_user(user)
            return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class VerifyOTP(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            data = request.data
            serializer = VerifyAccountSerializer(data=data)
            
            if serializer.is_valid(raise_exception=True):
                email = serializer.data['email']
                otp = serializer.data['otp']
                
                user_queryset = User.objects.filter(email=email)
                
                if not user_queryset.exists():
                    return Response({
                        'status': 400,
                        'message': 'Invalid Email',
                        'data': 'Invalid Email'
                    })

                user = user_queryset.first()

                if user is None:
                    return Response({
                        'status': 400,
                        'message': 'Invalid Email',
                        'data': 'Invalid Email'
                    })

                serializer = UserLoginSerializer(user, data={'is_active': True}, partial=True)
                if serializer.is_valid():
                    serializer.save()

                return Response({'msg': 'Account Verified'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'message': 'Something went wrong'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class UserLoginView(APIView):
    permission_classes = [AllowAny]
    renderer_class = [UserRenderer]
    def post(self, request, format= None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email =serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token':token,'msg':'Login Success'},
                    status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}},
                    status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user_with_google(request):
    if "google_oauth" in request.data:
        google_data = request.data["google_oauth"]

        serializer = UserRegistrationSerializer(
            data={
                "email": google_data.get("email"),
                "name": google_data.get("name"),
                "password": "some_random_password",  # Provide a default value
                "password2": "some_random_password",
                # Add other relevant fields from Google data
            }
        )

        if serializer.is_valid(raise_exception=False):
            serializer.save()  # Set is_active to True here
            return Response({"msg": "Registration successful"})
        else:
            print(serializer.errors)  # Print the serializer errors for debugging
            return Response(serializer.errors, status=400)

    return Response({"msg": "Invalid request data"},status=400)



@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    print('enterrrred')
    try:
        google_data = request.data.get("google_oauth")
        print(google_data,"doodle")
        email=google_data.get('email')

        user = User.objects.filter(email=google_data.get("email")).first()
        print(user,"userrrrrrrr")

        if user:

            serializer = UserLoginSerializer(data={"email":email, "password":"some_random_password"},)
            serializer.is_valid(raise_exception=True)
            user = authenticate(email=google_data.get("email"), password="some_random_password")
            print(user,"USER")
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response(
                {"token": {"access": access_token}, "msg": "Login Success", "user_name": user.name, "email": user.email},
                status=status.HTTP_200_OK
            )
        else:
            return Response({"msg": "User not registered"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"msg": "Error during Google login", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Home(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        bikes = Bike.objects.all()[:4]
        serializer = BikeSerializer(bikes, many=True)
        return Response(serializer.data)

class BikeList(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        # Print received query parameters
        city = request.GET.get('city', None)
        start_date_str = request.GET.get('start_date', None)
        end_date_str = request.GET.get('end_date', None)
        print("Received City:", city)
        print("Received Start Date:", start_date_str)
        print("Received End Date:", end_date_str)

        # Filter bikes based on city
        bikes = Bike.objects.all()
        if city:
            bikes = bikes.filter(city=city)
        
        # Filter bikes based on availability between start and end dates
        if start_date_str and end_date_str:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
            start_datetime = timezone.make_aware(datetime.combine(start_date, datetime.min.time()))
            end_datetime = timezone.make_aware(datetime.combine(end_date, datetime.max.time()))
            bikes = bikes.filter(available_from__lte=start_datetime, available_to__gte=end_datetime)

        # Print filtered bikes count
        print("Number of bikes after filtering:", bikes.count())

        serializer = BikeSerializer(bikes, many=True)
        return Response(serializer.data)
    

class BikeDetailView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, bikeId):
        try:
            bike = Bike.objects.get(id=bikeId)
            serializer = BikeSerializer(bike)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Bike.DoesNotExist:
            return Response({"error": "Bike not found"}, status=status.HTTP_404_NOT_FOUND)


class UserProfileView(APIView):
    permission_classes = [AllowAny]  # Ensure user is authenticated

    def get(self, request):
        user = request.user  # Get the authenticated user
        try:
            user = User.objects.get(email=user.email)  # Fetch the user object corresponding to the user's email
            serializer = UserProfileSerializer(user)  # Serialize the owner object
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User details not found"}, status=status.HTTP_404_NOT_FOUND)









# class UserProfileView(APIView):
#     renderer_classes = [UserRenderer]
#     permission_classes = [IsAuthenticated]
#     def get(self, request, format=None):
#         serializer = UserProfileSerializer(request.user)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# class UserChangePasswordView(APIView):
#     renderer_classes = [UserRenderer]
#     permission_classes = [IsAuthenticated]
#     def post(self, request, format=None):
#         serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
#         serializer.is_valid(raise_exception=True)
#         return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

# class SendPasswordResetEmailView(APIView):
#     renderer_classes = [UserRenderer]
#     def post(self, request, format=None):
#         serializer = SendPasswordResetEmailSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

# class UserPasswordResetView(APIView):
#     renderer_classes = [UserRenderer]
#     def post(self, request, uid, token, format=None):
#         serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
#         serializer.is_valid(raise_exception=True)
#         return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
