from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
import os

load_dotenv()

client_id = os.environ.get("client_id")
client_secret = os.environ.get("client_secret")
url = 'https://lk.cm.expert/oauth/token'
templates = Jinja2Templates(directory="./frontend")

token_conf = {}
