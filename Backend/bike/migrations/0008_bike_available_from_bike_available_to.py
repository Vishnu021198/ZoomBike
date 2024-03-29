# Generated by Django 5.0.1 on 2024-03-02 04:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bike', '0007_alter_bike_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='bike',
            name='available_from',
            field=models.DateField(default=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bike',
            name='available_to',
            field=models.DateField(default=None),
            preserve_default=False,
        ),
    ]
