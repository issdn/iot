from fastapi import FastAPI
from iot_server.models import HT
from iot_server.database_crud_functions import insert_ht, select_all_ht

app = FastAPI()

@app.post("/api/ht")
def humidity_temperature(ht: HT):
    insert_ht(ht)

@app.get("/api/ht")
def get_humidity_temperature():
    return select_all_ht()