import pprint
import time
from collections import defaultdict

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
        timestamp = int(time.time())
        if self.__access_token is None or (
            self.__timestamp is None
            or (self.__timestamp + self.__expires_in - 200) <= timestamp
        ):
            self.__refresh_token()

        return f"Bearer {self.__access_token}"

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
        if token is None:
            return None

        payload = {"accept": "application/json", "Authorization": token}
        response = requests.get(
            "https://appraisal.api.cm.expert/v1/regions", headers=payload
        )
        if response.status_code == 200:
            pprint.pp(response.json())
            regions = response.json()
            transformed_regions = {}
            for region in regions:
                if (
                    region["typeFullName"]
                    in ["Край", "Область", "Автономный округ", "Автономная область"]
                    and region["name"] != "Ханты-Мансийский Автономный округ - Югра"
                ):
                    name = f'{region["name"]} {region["typeFullName"]}'
                elif region["typeFullName"] == "Республика":
                    name = f'{region["typeFullName"]} {region["name"]}'
                else:
                    name = region["name"]
                if transformed_regions.get(name) is None:
                    transformed_regions[name] = {}
                if transformed_regions[name].get("p") is None:
                    transformed_regions[name]["p"] = {}
                transformed_regions[name]["p"]["region"] = region["regionId"]
                # pprint.pp(transformed_regions)
            return transformed_regions
        return {}

    def get_brands(self):
        token = self.get_token()
        if token is None:
            return None

        payload = {"accept": "application/json", "Authorization": token}
        response = requests.get(
            "https://appraisal.api.cm.expert/v1/autocatalog/brands", headers=payload
        )
        if response.status_code == 200:
            brands = response.json()
            transformed = {}
            for el in brands["brands"]:
                if transformed.get(el["text"]) is None:
                    transformed[el["text"]] = {}
                if transformed[el["text"]].get("p") is None:
                    transformed[el["text"]]["p"] = {}
                transformed[el["text"]]["p"]["brand"] = el["id"]
            return transformed
        return {}

    def get_models(self, brand):
        token = self.get_token()
        if token is None:
            return None

        payload = {"accept": "application/json", "Authorization": token}
        params = {"brand": brand}
        response = requests.get(
            "https://appraisal.api.cm.expert/v1/autocatalog/models?",
            headers=payload,
            params=params,
        )
        if response.status_code == 200:
            brands = response.json()
            transformed = {}
            for el in brands["models"]:
                if transformed.get(el["text"]) is None:
                    transformed[el["text"]] = {}
                if transformed[el["text"]].get("p") is None:
                    transformed[el["text"]]["p"] = {}
                transformed[el["text"]]["p"]["model"] = el["id"]
            return transformed
        return {}

    def get_creationYears(self, brand, model):
        token = self.get_token()
        if token is None:
            return None

        payload = {"accept": "application/json", "Authorization": token}
        params = {"brand": brand, "model": model}
        response = requests.get(
            "https://appraisal.api.cm.expert/v1/autocatalog/creationYears",
            headers=payload,
            params=params,
        )
        if response.status_code == 200:
            years = response.json()
            transformed = defaultdict(dict)
            for year in years["years"]:
                transformed[year] = {"p": {"creationYear": year}}
            return transformed
        return {}

    def get_simple_apprasial(self, brand, model, creationYear, regionId=2491811):
        token = self.get_token()
        if token is None:
            return None
        payload = {"accept": "application/json", "Authorization": token}
        params = {
            "brand": brand,
            "model": model,
            "creationYear": creationYear,
            "regionId": regionId,
        }
        response = requests.get(
            "https://appraisal.api.cm.expert/v1/appraisal/similar/simple?",
            headers=payload,
            params=params,
        )

        if response.status_code == 422:
            params = {
                "brand": brand,
                "model": model,
                "creationYear": creationYear,
            }
            response = requests.get(
                "https://appraisal.api.cm.expert/v1/appraisal/similar/simple?",
                headers=payload,
                params=params,
            )
        if response.status_code == 200:
            ans = response.json()
            try:
                min_ = round(ans["correctedPriceCategories"]["middle"]["min"])
                max_ = round(ans["correctedPriceCategories"]["middle"]["max"])
            except Exception:
                min_ = round(ans["priceCategories"]["middle"]["min"])
                max_ = round(ans["priceCategories"]["middle"]["max"])

            tansformed_min = f"{min_:,}".replace(",", " ")
            tansformed_max = f"{max_:,}".replace(",", " ")
            return {"min": tansformed_min, "max": tansformed_max}
        return {}


token_manager = TokenManager()
