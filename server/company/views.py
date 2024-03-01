from os import stat
from django.test.signals import static_storage_changed
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.schemas.coreapi import serializers
from company.models import Company, Job
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from company.serializers import CompanySerializer, JobPreviewSerializer, JobSerializer
from userprofile.serializers import UserProfileSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_company(request, name):
    try:
        company = Company.objects.get(name=name)
        companydata = CompanySerializer(company, many=False)
        return Response(companydata.data)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_job(request, id):
    try:
        company = Job.objects.get(pk=id)
        print(company.__dict__)
        jobdata = JobSerializer(company, many=False)
        return Response(jobdata.data)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_all_jobs(request):
    jobs = Job.objects.all()
    serializer = JobPreviewSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, JSONParser])
def set_company(request):
    if request.method == 'POST':
        print(request.data)
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user) #remove later for tests
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        company = Company.objects.get(pk=request.data.get('pk'))
        serializer = CompanySerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_job(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        serializer = JobSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def close_position(request, pk):
    data = JSONParser().parse(request)
    job = Job.objects.get(pk=pk, company_id=data.get('company_id'))
    if (job and job.company.user == request.user):
        job.open = False
        job.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apply(request, pk):
    job = Job.objects.get(pk=pk)
    request.user.profile.job_set.add(job)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applied(request, pk):
    job = Job.objects.get(pk=pk)
    serializer = UserProfileSerializer(job.applied.all(), many=True)
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)


    
