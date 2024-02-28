from rest_framework import serializers
from django.contrib.auth.models import User

from company.serializers import CompanySerializer, JobSerializer


from .models import UserProfile, Education, Experience

class AppliedSerialzer(serializers.RelatedField):
    def to_representation(self, value):
        return value.pk


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    job_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = ['pk', 'first_name', 'last_name', 'position',
                  'bio', 'profile_pic', 'resume', 'phone_number',
                  'username', 'job_set', 'email']
        read_only_fields = ('username', 'job_set', 'email',)
        depth = 1

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['pk', 'title', 'company_name', 'start', 'end', 'description']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education 
        fields = ['pk', 'institution', 'degree', 'study_field', 'activites', 'description', 'start', 'end']

class UserSerializer(serializers.ModelSerializer):
    companies = CompanySerializer(many=True)
    profile = UserProfileSerializer(many=False)
    experience = ExperienceSerializer(many=True)#serializers.SerializerMethodField()
    education = EducationSerializer(many=True)#serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile', 'experience', 'education', 'companies')
        # extra_kwargs = {'password': {'write_only': True}}
