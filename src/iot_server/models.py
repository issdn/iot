from pydantic import BaseModel


class HT(BaseModel):
    temperature: float
    humidity: float