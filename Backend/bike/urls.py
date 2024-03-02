from django.urls import path
from .views import add_bike
from .  import views
from .views import BikeBrandView, BikeModelView, BikeListView
urlpatterns = [
    path('add_bike/', views.add_bike, name='add_bike'),
    path('bike-brands/', BikeBrandView.as_view(), name='bike-brands-list'),
    path('models/', BikeModelView.as_view(), name='bike-model-list'),
    path('bike_list/', BikeListView.as_view(), name='bike-list'),
]
