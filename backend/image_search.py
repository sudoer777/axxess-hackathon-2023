from wikidata.client import Client
from wikidataintegrator import wdi_core


def find_wd_entity(query: str):
    results = wdi_core.WDItemEngine.get_wd_search_results(query, max_results=1)
    return results[0]

def get_image_url(wd_entity_id: str):
    client = Client()
    entity = client.get(wd_entity_id, load=True)
    image_prop = client.get('P18')
    image = entity[image_prop]
    return image.image_url