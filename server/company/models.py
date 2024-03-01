from django.db import models
from django.contrib.auth.models import User
from userprofile.models import UserProfile

class Company(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='companies')
    name = models.CharField(max_length=100, unique=True)
    industry = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    about = models.TextField(max_length=1000)
    logo = models.ImageField(upload_to="img/companies")

class Job(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='jobs')
    applied = models.ManyToManyField(UserProfile, blank=True)
    position = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    requirement = models.TextField(max_length=1000, null=True, blank=True)
    salary = models.IntegerField(null=True, blank=True)
    currency = models.TextField(max_length=50 ,null=True, blank=True)
    experience = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    open = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created', '-pk']


    
    
