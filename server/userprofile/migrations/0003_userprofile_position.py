# Generated by Django 5.0.2 on 2024-02-23 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0002_alter_education_options_alter_experience_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='position',
            field=models.CharField(default='engineer', max_length=255),
            preserve_default=False,
        ),
    ]
