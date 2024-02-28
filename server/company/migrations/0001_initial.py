# Generated by Django 5.0.2 on 2024-02-25 18:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('userprofile', '0004_alter_userprofile_position'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('industry', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=255)),
                ('about', models.TextField(max_length=1000)),
                ('logo', models.ImageField(upload_to='img/companies')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=1000)),
                ('salary', models.IntegerField(blank=True, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('open', models.BooleanField()),
                ('applied', models.ManyToManyField(to='userprofile.userprofile')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.company')),
            ],
            options={
                'ordering': ['-created', '-pk'],
            },
        ),
    ]
