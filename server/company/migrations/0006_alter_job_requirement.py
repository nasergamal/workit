# Generated by Django 5.0.2 on 2024-03-01 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0005_job_requirement'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='requirement',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
    ]
