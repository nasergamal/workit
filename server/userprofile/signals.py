from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile


@receiver(post_save, sender=User)
def profile_creation(sender, instance=None, created=False, **kwargs):
    print(kwargs)
    if created:
        UserProfile.objects.create(user=instance, first_name=instance.first_name, last_name=instance.last_name,)


