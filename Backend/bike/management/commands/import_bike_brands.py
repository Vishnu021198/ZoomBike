import json
import os
from django.core.management.base import BaseCommand
from bike.models import BikeBrand, BikeModel

class Command(BaseCommand):
    help = 'Import bike brands and models from JSON file'

    def handle(self, *args, **options):
        file_path = os.path.abspath('moto_models.json')

        with open(file_path, 'r') as file:
            data = json.load(file)

        for item in data['data']:
            # Create or get BikeBrand instance
            brand, created = BikeBrand.objects.get_or_create(id=item['brand_id'], defaults={'name': item['name']})

            # Create BikeModel instance with ForeignKey relationship to BikeBrand
            BikeModel.objects.create(brand=brand, id=item['id'], name=item['name'])

        self.stdout.write(self.style.SUCCESS('Successfully imported bike brands and models.'))
