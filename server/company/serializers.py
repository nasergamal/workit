from typing_extensions import ReadOnly
from django.db.models import fields_all
from rest_framework import serializers
from django.contrib.auth.models import User, models

from company.models import Company, Job


class JobSerializer(serializers.ModelSerializer):
    company_id = serializers.IntegerField()
    company_name = serializers.CharField(source='company.name',read_only=True)
    class Meta:
        model = Job
        fields = ['pk', 'position', 'description', 'salary', 'currency', 'experience', 'created', 'open', 'company_id', 'company_name']
        read_only_fields = ('company_pk', 'company_name',)

class CompanySerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(read_only=True, source='user.username')
    jobs = JobSerializer(many=True, read_only=True)
    class Meta:
        model = Company
        fields = ['pk', 'name', 'industry', 'address', 'about', 'logo', 'jobs', 'user_username']
        read_only_fields = ('user_username', 'jobs')

