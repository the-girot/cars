import logging
import os

from dotenv import load_dotenv
from fastapi.templating import Jinja2Templates

load_dotenv()

client_id = os.environ.get("client_id")
client_secret = os.environ.get("client_secret")
token = os.environ.get("token")
sale_url = f"https://chatter.salebot.pro/api/{token}/callback"
url = "https://lk.cm.expert/oauth/token"
templates = Jinja2Templates(directory="./frontend")

token_conf = {}

logging.basicConfig(
    filename="app.log",  # Имя файла для записи логов
    level=logging.INFO,  # Уровень логирования
    format="%(asctime)s - %(levelname)s - %(message)s",  # Формат записи логов
)
