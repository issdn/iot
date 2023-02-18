from iot_server.models import ControllerInfoModel, ControllerModel
from datetime import datetime


class NoControllerException(Exception):
    pass


class Controller:
    def __init__(self) -> None:
        self.base_info: ControllerModel = None
        self.last_message_time: datetime.time = None

    def set_from_request(self, controller: ControllerModel):
        if not controller == self.base_info:
            self.base_info = controller
        self.update_last_message_time()

    def get_info(self):
        if not self.base_info:
            raise NoControllerException("No controller running.")
        timedelta = datetime.utcnow() - self.last_message_time
        last_message_to_now_minutes_difference = timedelta.total_seconds() / 60
        return ControllerInfoModel(**self.base_info.dict(), last_message_minutes_ago=last_message_to_now_minutes_difference)

    def update_last_message_time(self):
        if self.base_info:
            self.last_message_time = datetime.utcnow()
