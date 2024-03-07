# Generated by Django 5.0.1 on 2024-03-07 08:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0008_bike_available_from_bike_available_to'),
        ('owner', '0005_alter_owner_bike_license_number_alter_owner_name_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pickup_date', models.DateField()),
                ('drop_date', models.DateField()),
                ('number_of_days', models.PositiveIntegerField()),
                ('city', models.CharField(max_length=50)),
                ('amount_paid', models.DecimalField(decimal_places=2, max_digits=10)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=15)),
                ('aadhar_number', models.CharField(max_length=12)),
                ('is_paid', models.BooleanField(default=False)),
                ('bike', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bike.bike')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='owner.owner')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]