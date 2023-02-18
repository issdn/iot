from fastapi import FastAPI, HTTPException, Request, Response
from iot_server.controller_service import Controller, NoControllerException
from iot_server.models import HTModel, ControllerModel
from iot_server.database_crud_functions import insert_ht, select_ht_by_date, create_new_table
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import cassandra

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_controller = Controller("HT")


@app.get("/api/test/newtable")
def new_table():
    create_new_table()


@app.get("/api/controllers")
def get_connected_controller():
    try:
        return [current_controller.get_info()]
    except NoControllerException:
        return []


@app.post("/api/ht")
def humidity_temperature(ht: HTModel,  request: Request):
    insert_ht(ht)
    request_controller = ControllerModel(ip=request.client[0])
    current_controller.set_from_request(request_controller)


@app.get("/api/ht")
def get_humidity_temperature(date: str = datetime.utcnow().strftime("%Y-%m-%d")):
    try:
        datetime.strptime(date, "%Y-%m-%d")
        return {"date": date, "measurements": list(select_ht_by_date(date))}
    except ValueError:
        raise HTTPException(
            status_code=400, detail="Incorrect date format. Should be %Y-%m-%d.")
    except cassandra.InvalidRequest as err:
        raise HTTPException(
            status_code=400, detail=err)
