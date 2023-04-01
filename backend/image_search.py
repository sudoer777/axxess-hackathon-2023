from wikidata.client import Client


def get_image_url(wd_entity_id: str):
    client = Client()
    entity = client.get(wd_entity_id, load=True)
    image_prop = client.get('P18')
    image = entity[image_prop]
    return image.image_url