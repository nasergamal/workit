# Generated by Django 5.0.2 on 2024-02-26 17:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0001_initial'),
        ('userprofile', '0004_alter_userprofile_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='applied',
            field=models.ManyToManyField(blank=True, to='userprofile.userprofile'),
        ),
        migrations.AlterField(
            model_name='job',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to='company.company'),
        ),
    ]
