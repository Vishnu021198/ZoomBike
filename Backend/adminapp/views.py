from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from account.models import User
from owner.models import Owner
from rest_framework import status
from .serializers import UserSerializers, OwnerSerializers
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny

# Create your views here.


class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        email = request.data.get("email")
        print('email',email)
        password = request.data.get("password")
        print('password',password)
        user = authenticate(email=email, password=password)

        if user and user.is_admin:
            return Response({"msg": "Admin Login Success", "user_email": user.email}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"errors": {"non_field_errors": ["Invalid admin credentials"]}},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class UserListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializers



@api_view(['PUT'])
@permission_classes([AllowAny])
def admin_user_block(request,pk):
    user = get_object_or_404(User,id=pk)
    user.is_active = False
    user.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([AllowAny])
def admin_user_unblock(request,pk):
    user = get_object_or_404(User,id=pk)
    user.is_active = True
    user.save()
    return Response(status=status.HTTP_200_OK)


class OwnerListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializers