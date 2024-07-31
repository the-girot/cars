from cars_app.config import templates
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from cars_app.TokenManager import token_manager

app = FastAPI()



app.mount("/frontend", StaticFiles(directory="./frontend"), name="frontend")
app.mount("/static", StaticFiles(directory="./frontend"), name="static")
app.mount("/scripts", StaticFiles(directory="./frontend/scripts"), name="scripts")


@app.get("/")
async def get_home_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/price")
async def get_price_page(request: Request):
    return templates.TemplateResponse("final.html", {"request": request})

@app.get("/regions")
async def get_regions():
    return token_manager.get_regions()