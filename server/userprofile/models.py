from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    bio = models.TextField(max_length=1000, null=True, blank=True)
    profile_pic = models.ImageField(upload_to="img/profile_pic", default='img/profile_pic/anon.jpeg')
    resume = models.FileField(null=True, blank=True)
    phone_number = PhoneNumberField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

class Experience(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='experience')
    title  = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    start = models.DateTimeField()
    end  = models.DateTimeField(blank=True, null=True)
    description = models.TextField(max_length=1000, null=True, blank=True)

class Education(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='education')
    school = models.CharField(max_length=255)
    degree = models.CharField(max_length=255, blank=True, null=True)
    study_field = models.CharField(max_length=255, blank=True, null=True)
    activites = models.TextField(blank=True, null=True)
    description = models.TextField(max_length=1000, null=True, blank=True)



