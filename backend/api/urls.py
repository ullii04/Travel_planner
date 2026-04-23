from api.views.cbv import *
from django.contrib import admin
from django.urls import path, include
from api.views.fbv import *

urlpatterns = [
    path('auth/login', login_view),
    path('auth/logout', logout_view),

    path('destinations', DestinationList.as_view()),
    path('destinations/<int:pk>', DestinationDetail.as_view()),

    path('my-trips', TripListCreate.as_view()),
    path('my-trips/<int:pk>', TripDetail.as_view()),
    path('auth/register', register_view),
]