# Generated by Django 5.0.1 on 2024-02-18 10:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0006_alter_bike_owner'),
        ('owner', '0005_alter_owner_bike_license_number_alter_owner_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bike',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='owner.owner'),
        ),
    ]
