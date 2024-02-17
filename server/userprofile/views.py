from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from userprofile.serializers import UserProfileSerializer, ExperienceSerializer , EducationSerializer, UserSerializer
from .models import UserProfile, Experience, Education
@api_view(['GET'])
def profile(request):
    if request.user.is_authenticated:
        user = request.user
        print(user.__dict__)
        userdata = UserSerializer(user._wrapped, many=False)
        print(userdata.__dict__)
        return Response({'user': userdata.data})
    return Response(status=status.HTTP_401_UNAUTHORIZED)
 
