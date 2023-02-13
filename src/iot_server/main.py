from fastapi import FastAPI, status
from models import HT

def add_ht_to_database(ht: HT) -> None:
    pass

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/ht")
def humidity_temperature(ht: HT):
    return status(200)