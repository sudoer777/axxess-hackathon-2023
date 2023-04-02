import json

from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.query_response.images import ImageQuery
from backend.query_response.summary import SummaryQuery


# Create your views here.


@api_view(['POST'])
def query(request):
    user_query = request.data['query']
    image_response = ImageQuery(user_query).image_url
    summary_response = SummaryQuery(user_query)
    result = {
        "image": [image_response],
        "message": summary_response.message,
        "suggestions": summary_response.suggestions
    }
    return Response(result)
