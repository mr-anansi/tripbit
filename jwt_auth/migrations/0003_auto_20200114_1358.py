# Generated by Django 3.0.2 on 2020-01-14 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_auto_20200110_1500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='score',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
