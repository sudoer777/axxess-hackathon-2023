import json

from django.http import HttpResponse
from rest_framework.decorators import api_view

from backend.query_response.images import ImageQuery


# Create your views here.

@api_view(['POST'])
def query(request):
    user_query = request.data['query']
    image_response = ImageQuery(user_query)
    return HttpResponse(image_response.image_url)
