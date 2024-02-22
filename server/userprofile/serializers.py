from http.client import NETWORK_AUTHENTICATION_REQUIRED
from rest_framework import serializers
from django.contrib.auth.models import User


from .models import UserProfile, Education, Experience

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['pk', 'first_name', 'last_name', 'bio', 'profile_pic', 'resume', 'phone_number']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['pk', 'title', 'company_name', 'start', 'end', 'description']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education 
        fields = ['pk', 'institution', 'degree', 'study_field', 'activites', 'description', 'start', 'end']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(many=False)
    experience = ExperienceSerializer(many=True)#serializers.SerializerMethodField()
    education = EducationSerializer(many=True)#serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile', 'experience', 'education')
        # extra_kwargs = {'password': {'write_only': True}}
