from cars_app.config import templates
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from cars_app.TokenManager import token_manager

app = FastAPI()



app.mount("/frontend", StaticFiles(directory="./frontend"), name="frontend")
app.mount("/static", StaticFiles(directory="./frontend"), name="static")
app.mount("/scripts", StaticFiles(directory="./frontend/scripts"), name="scripts")


@app.get("/home")
async def get_home_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

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
async def get_models(brand:int):
    return token_manager.get_models(brand)

@app.get("/creationYears")
async def get_creation_year(brand:int, model:int):
    return token_manager.get_creationYears(brand, model)

@app.get("/get_apprasial")
async def get_appr(brand:int, regionId:int, model:int, creationYear:int):
    return token_manager.get_simple_apprasial(brand, regionId, model, creationYear)

@app.get("/")
async def get_gpt_page(request: Request):
    return templates.TemplateResponse("gpt.html", {"request": request})  