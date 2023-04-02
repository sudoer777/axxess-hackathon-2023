from django.http import HttpResponse
from django.shortcuts import render

from backend.image_search import get_image_url, find_wd_entity


# Create your views here.

def index(request, query: str):
    wd_id = find_wd_entity(query)
    url = get_image_url(wd_id)
    return HttpResponse(url)