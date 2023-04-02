import requests
import spacy
import json

from django.conf import settings

small_eng_model = spacy.load('en_core_web_md')


def get_image_url(search_query: str):
    url = "https://google.serper.dev/images"
    payload = json.dumps({
        "q": search_query
    })
    headers = {
        'X-API-KEY': settings.SERPAPI_API_KEY,
        'Content-Type': 'application/json'
    }
    response = requests.post(url, headers=headers, data=payload)
    return response.json()['images'][0]['imageUrl']


def get_search_query(model):
    search_query = []
    for token in model:
        if not token.is_stop and not token.is_punct and not token.pos_ == "VERB":
            search_query.append(token.text)
    search_query.append("diagram")
    return ' '.join(search_query)


class ImageQuery:
    def __init__(self, user_query: str):
        self.user_query = user_query
        self.model = small_eng_model(user_query)
        self.search_query = get_search_query(self.model)
        self.image_url = get_image_url(self.search_query)
