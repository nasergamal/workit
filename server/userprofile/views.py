from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from userprofile.serializers import UserProfileSerializer, ExperienceSerializer , EducationSerializer

@api_view(['GET'])
def profile(request):
    user = request.user
    print(user.__dict__)
    if user.is_authenticated:
        return Response({'user': user._wrapped})
    return Response({'error': 'unauthenticated'})
 
