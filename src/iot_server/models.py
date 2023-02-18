from pydantic import BaseModel


class ControllerModel(BaseModel):
    ip: str


class ControllerInfoModel(ControllerModel):
    last_message_minutes_ago: int
    name: str


class HTModel(BaseModel):
    temperature: float
    humidity: float
