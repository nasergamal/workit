# Generated by Django 5.0.2 on 2024-03-02 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0006_alter_job_requirement'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='description',
            field=models.TextField(),
        ),
    ]
