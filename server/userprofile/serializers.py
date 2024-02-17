from rest_framework import serializers
from django.contrib.auth.models import User

from .models import UserProfile, Education, Experience

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'bio', 'profile_pic', 'resume', 'phone_number']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['title', 'company_name', 'start', 'end', 'description']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education 
        fields = ['school', 'degree', 'study_field', 'activites', 'description']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(many=False)
    experience = serializers.SerializerMethodField()
    education = serializers.SerializerMethodField()

    def get_experience(self, obj):
        if self.context.get('created', False):
            return ExperienceSerializer(obj.experience.filter(is_created=True), many=True).data
        return None

    def get_education(self, obj):
        if self.context.get('created', False):
            return EducationSerializer(obj.education.filter(is_created=True), many=True).data
        return None

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profile', 'experience', 'education')
        extra_kwargs = {'password': {'write_only': True}}
