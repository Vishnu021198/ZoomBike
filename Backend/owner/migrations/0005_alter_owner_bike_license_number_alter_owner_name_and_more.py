# Generated by Django 5.0.1 on 2024-01-23 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('owner', '0004_alter_owner_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='bike_license_number',
            field=models.CharField(max_length=13),
        ),
        migrations.AlterField(
            model_name='owner',
            name='name',
            field=models.CharField(default=None, max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='owner',
            name='phone_number',
            field=models.CharField(default=None, max_length=15),
            preserve_default=False,
        ),
    ]