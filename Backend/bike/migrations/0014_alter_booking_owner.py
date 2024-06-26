# Generated by Django 5.0.1 on 2024-04-03 20:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0013_booking_is_canceled'),
        ('owner', '0006_alter_owner_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='owner.owner'),
        ),
    ]
