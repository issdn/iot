from pydantic import BaseModel

# HT Database
# temperature double
# humidity int
# measurement_date date
# measurement_time time

class ControllerModel(BaseModel):
    ip: str


class ControllerInfoModel(ControllerModel):
    last_message_minutes_ago: int
    name: str


class HTModel(BaseModel):
    temperature: float
    humidity: float