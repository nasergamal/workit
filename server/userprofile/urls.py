from django.urls import path
from .views import profile, set_experience

app_name = 'profile'
urlpatterns = [
    path('me/', view=profile),
    path('set-experience/', view=set_experience),
]
