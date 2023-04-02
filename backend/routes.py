from django.http import HttpResponse


# Create your views here.

def index(request, query: str):
    return HttpResponse('Hello world')