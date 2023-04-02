from django.urls import path

from backend import api

urlpatterns = [
    path('query', api.query, name='query')
]
