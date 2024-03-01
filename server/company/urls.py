

from django.urls import path
from company.views import set_company, get_company, set_job, get_job, close_position, apply, applied, get_all_jobs

urlpatterns = [
    path('set/', view=set_company),
    path('get/<name>/', view=get_company),
    path('job/get/all/', view=get_all_jobs),
    path('job/get/<id>/', view=get_job),
    path('job/set/', view=set_job),
    path('job/apply/<pk>', view=apply),
    path('job/close/<pk>', view=close_position), 
    path('job/apply/get/<pk>', view=applied),
]
