# Generated by Django 5.0.1 on 2024-03-27 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0012_alter_booking_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='is_canceled',
            field=models.BooleanField(default=False),
        ),
    ]
