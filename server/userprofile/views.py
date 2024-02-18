from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from userprofile.serializers import UserProfileSerializer, ExperienceSerializer , EducationSerializer, UserSerializer
from userprofile.models import UserProfile, Experience, Education

def get_user(user):
    try:
        return user._wrapped
    except:
        return user


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    print(request.user.is_authenticated)
    user = request.user
    userdata = UserSerializer(get_user(user), many=False)
    return Response(userdata.data)
 

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def set_experience(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ExperienceSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
        else:
            print(serializer)
            print(serializer.__dict__)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        experience = Experience.objects.get(pk=data.get('pk'))
        serializer = ExperienceSerializer(experience, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def set_education(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = EducationSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
        else:
            print(serializer)
            print(serializer.__dict__)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        experience = Education.objects.get(pk=data.get('pk'))
        serializer = EducationSerializer(experience, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def set_profile(request):
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        experience = UserProfile.objects.get(pk=data.get('pk'))
        serializer = UserProfileSerializer(experience, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
