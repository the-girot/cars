from typing import Optional

import requests
from cars_app.config import logging, sale_url, templates
from cars_app.TokenManager import token_manager
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles

app = FastAPI()


app.mount("/frontend", StaticFiles(directory="./frontend"), name="frontend")
app.mount("/static", StaticFiles(directory="./frontend"), name="static")
app.mount("/scripts", StaticFiles(directory="./frontend/scripts"), name="scripts")


@app.get("/home")
async def get_home_page(clientId: str, request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request, "clientId": clientId}
    )


@app.get("/price")
async def get_price_page(request: Request):
    return templates.TemplateResponse("final.html", {"request": request})


@app.get("/regions")
async def get_regions():
    return token_manager.get_regions()


@app.get("/brands")
async def get_brands():
    return token_manager.get_brands()


@app.get("/models")
async def get_models(brand: int):
    return token_manager.get_models(brand)


@app.get("/creationYears")
async def get_creation_year(brand: int, model: int):
    return token_manager.get_creationYears(brand, model)


@app.get("/get_apprasial")
async def get_appr(
    brand: int, model: int, creationYear: int, regionId: Optional[int] = 2491811
):
    return token_manager.get_simple_apprasial(
        brand=brand, regionId=regionId, model=model, creationYear=creationYear
    )


@app.get("/")
async def get_gpt_page(request: Request, clientId: str = None):
    return templates.TemplateResponse("gpt.html", {"request": request})


@app.get("/sendtosalebot")
async def send_to_salebot(
    phone: str, username: str, brand: str, model: str, creationYear: str, clientId: str
):
    # Логирование входящих данных
    logging.info(f"Получен запрос с номером телефона: {phone}")

    # Параметры для запроса к внешнему API
    params = {
        "client_id": clientId,
        "message": "rashcet",
    }

    # Логирование параметров запроса
    logging.info(f"Отправляем запрос с параметрами: {params}")
    url = sale_url + (
        f"?username={username}&brand={brand}&model={model}&creationYear={creationYear}&userphone={phone}"
    )

    try:
        # Отправка запроса к внешнему API
        response = requests.post(url, json=params)
        response.raise_for_status()  # Проверка на статус 4xx/5xx
        logging.info("Запрос успешно выполнен.")
        return {"message": "Запрос успешно отправлен."}
    except requests.exceptions.HTTPError as http_err:
        logging.error(f"HTTP ошибка: {http_err}")
        raise HTTPException(status_code=400, detail="Ошибка при отправке данных")
    except Exception as err:
        logging.error(f"Ошибка выполнения запроса: {err}")
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")
