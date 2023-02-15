from fastapi import FastAPI
from iot_server.models import HT
from iot_server.database_crud_functions import insert_ht, select_ht_by_date
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/ht")
def humidity_temperature(ht: HT):
    insert_ht(ht)

@app.get("/api/ht")
def get_humidity_temperature(date: datetime = datetime.utcnow().date()):
    return {"date":date, "measurements": list(select_ht_by_date(date))}