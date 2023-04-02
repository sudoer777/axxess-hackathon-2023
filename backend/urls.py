from django.urls import path

from backend import views

urlpatterns = [
    path('<str:query>', views.index, name='index')
]
