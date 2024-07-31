import time

import requests
from cars_app.config import client_id, client_secret, url


class TokenManager:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(TokenManager, cls).__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        # Initialize only if the instance is new
        if not hasattr(self, "_initialized"):
            self.__access_token = None
            self.__timestamp = None
            self.__expires_in = None
            self._initialized = True

    def get_token(self):
        refr = False
        if self.__access_token is None:
            refr = self.__refresh_token()
        timestamp = int(time.time())
        if (
            self.__timestamp is None
            or (self.__timestamp + self.__expires_in - 200) <= timestamp
        ):
            refr = self.__refresh_token()
        print(refr)
        if refr:
            return f"Bearer {self.__access_token}"
        else:
            return None

    def __refresh_token(self):
        payload = {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        }

        # Make the POST request to get the token
        response = requests.post(url, data=payload)

        # Check if the request was successful
        if response.status_code == 200:
            answer = response.json()
            self.__access_token = answer["access_token"]
            self.__timestamp = int(time.time())
            self.__expires_in = answer["expires_in"]
            return True
        else:
            return False

    def get_regions(self):
        token = self.get_token()
        print(token)
        if token is None:
            return None

        payload = {
            "accept": "application/json",
            "Authorization": token
        }
        response = requests.get("https://appraisal.api.cm.expert/v1/regions",  headers=payload)
        if response.status_code == 200:
            regions = response.json()
            transformed_regions = {region["name"]: region["regionId"] for region in regions}
            return {"res": transformed_regions}
        return {"res": [], }


    def get_brands(self):
        pass

    def get_models(self, brand_id):
        pass

    def get_creationYears(self, brand_id, model_id):
        pass

    def get_generations(self, brand_id, model_id, creation_year):
        pass

    def get_bodies(self, brand_id, model_id, creation_year, generation):
        pass

    def get_gears(self, brand_id, model_id, creation_year, generation, body_id, doors):
        pass

    def get_drives(
        self, brand_id, model_id, creation_year, generation, body_id, doors, gears
    ):
        pass

    def get_engines(
        self,
        brand_id,
        model_id,
        creation_year,
        generation,
        body_id,
        doors,
        gears,
        drives,
    ):
        pass


token_manager = TokenManager()
