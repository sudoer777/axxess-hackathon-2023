from django.urls import path

from backend import routes

urlpatterns = [
    path('<str:query>', routes.index, name='index')
]
