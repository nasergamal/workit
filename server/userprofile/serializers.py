from rest_framework import serializers
from .models import UserProfile, Education, Experience

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'bio', 'profile_pici', 'resume', 'phone_number']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['title', 'company_name', 'start', 'end', 'description']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education 
        fields = ['school', 'degree', 'study_field', 'activites', 'description']
