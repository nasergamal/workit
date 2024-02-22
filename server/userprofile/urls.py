from django.urls import path
from .views import profile, set_experience, set_education, set_profile

app_name = 'profile'
urlpatterns = [
    path('me/', view=profile),
    path('set-experience/', view=set_experience),
    path('set-education/', view=set_education),
    path('set-profile/', view=set_profile),
]
