from dj_rest_auth.registration.views import VerifyEmailView
from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        return 'http://localhost:3000/' + 'verify/{}'.format(emailconfirmation.key)
