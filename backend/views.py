from django.http import HttpResponse
from django.shortcuts import render

from backend.image_search import get_image_url


# Create your views here.

def index(request, wd_id: str):
    url = get_image_url(wd_id)
    return HttpResponse(url)