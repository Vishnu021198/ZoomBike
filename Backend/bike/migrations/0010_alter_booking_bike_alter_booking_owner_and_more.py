# Generated by Django 5.0.1 on 2024-03-21 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0009_booking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='bike',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='booking',
            name='owner',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='booking',
            name='user',
            field=models.CharField(max_length=50),
        ),
    ]
