from django.urls import path
from .views import profile, set_experience, set_education, set_profile, search_profile, retrieve_user

app_name = 'profile'
urlpatterns = [
    path('me/', view=profile),
    path('get/<username>/', view=retrieve_user),
    path('set-experience/', view=set_experience),
    path('set-education/', view=set_education),
    path('set-profile/', view=set_profile),
    path('search/', view=search_profile),
]
