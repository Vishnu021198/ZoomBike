from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Bike, BikeBrand, BikeModel
from .serializers import BikeSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import BikeBrandSerializer, BikeModelSerializer
from rest_framework.permissions import AllowAny
from owner.models import Owner

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_bike(request):
    if request.method == 'POST':
        owner = Owner.objects.get(email=request.user.email)
        
        brand_id = request.data.get('brand_id')
        model_id = request.data.get('model_id')
        registration_number = request.data.get('registration_number')
        km_driven = request.data.get('km_driven')
        year_of_registration = request.data.get('year_of_registration')
        city = request.data.get('city')
        bike_rent = request.data.get('bike_rent')
        images = request.data.get('images')

        try:
            brand = BikeBrand.objects.get(id=brand_id)
            model = BikeModel.objects.get(id=model_id)

            bike = Bike.objects.create(
                owner=owner,
                owner_name=owner.name,
                owner_phone_number=owner.phone_number,
                brand=brand,
                model=model,
                registration_number=registration_number,
                km_driven=km_driven,
                year_of_registration=year_of_registration,
                city=city,
                bike_rent=bike_rent,
                images=images
            )

            serializer = BikeSerializer(bike)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except BikeBrand.DoesNotExist:
            return Response({'error': 'Bike brand does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        except BikeModel.DoesNotExist:
            return Response({'error': 'Bike model does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)


class BikeBrandView(APIView):
    permission_classes=[AllowAny]
    def get(self, request):
        brands = BikeBrand.objects.all()
        serializer = BikeBrandSerializer(brands, many=True)
        return Response(serializer.data)

class BikeModelView(APIView): 
    permission_classes=[AllowAny]
   
    def get(self, request):
        models = BikeModel.objects.all()
        serializer = BikeModelSerializer(models, many=True)
        return Response(serializer.data)
    
class BikeListView(APIView):
    def get(self, request):
        bikes = Bike.objects.all()
        serializer = BikeSerializer(bikes, many=True)
        return Response(serializer.data)
    
