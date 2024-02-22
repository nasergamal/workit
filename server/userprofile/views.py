from allauth.account.utils import user_email
from django.http.response import ResponseHeaders
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import json

from rest_framework.schemas.coreapi import serializers
from userprofile.serializers import UserProfileSerializer, ExperienceSerializer , EducationSerializer, UserSerializer
from userprofile.models import UserProfile, Experience, Education
from userprofile.forms import UserProfileForm

def get_user(user):
    try:
        return user._wrapped
    except:
        return user


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    userdata = UserSerializer(get_user(user), many=False)
    return Response(userdata.data)
 

@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def set_experience(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ExperienceSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        experience = Experience.objects.get(pk=data.get('pk'), user=request.user)
        serializer = ExperienceSerializer(experience, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
    if request.method == 'DELETE':
        data = JSONParser().parse(request)
        experience = Experience.objects.get(pk=data.get('pk'), user=request.user)
        experience.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def set_education(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        serializer = EducationSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        experience = Education.objects.get(pk=data.get('pk'), user=request.user)
        serializer = EducationSerializer(experience, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
    if request.method == 'DELETE':
        data = JSONParser().parse(request)
        education = Education.objects.get(pk=data.get('pk'), user=request.user)
        education.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, JSONParser])
def set_profile(request):
    if request.method == 'PUT':
        userprofile = UserProfile.objects.get(pk=request.data.get('pk'))
        serializer = UserProfileSerializer(userprofile, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            print(serializer.data)
            return Response(serializer.data)
        else:
            pass#return Response(serializer.errors)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
