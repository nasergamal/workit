# Generated by Django 5.0.2 on 2024-02-27 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0003_job_experience_alter_company_user_alter_job_open'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='currency',
            field=models.TextField(blank=True, max_length=50, null=True),
        ),
    ]
