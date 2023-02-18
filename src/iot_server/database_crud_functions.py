from iot_server.db_connection import get_new_session
from iot_server.models import HTModel
from datetime import datetime
from cassandra.query import dict_factory

KEYSPACE = "iot"
TABLE = "ht"

session = get_new_session()
session.row_factory = dict_factory


def create_new_table():
    NEW_HT_TABLE = f"""
    CREATE TABLE {KEYSPACE}.{TABLE} (
        temperature double,
        humidity int,
        measurement_date date,
        measurement_time time,
        PRIMARY KEY ((measurement_date), measurement_time)
    ) WITH CLUSTERING ORDER BY (measurement_time ASC); 
    """
    session.execute(f"DROP TABLE IF EXISTS {KEYSPACE}.{TABLE};")
    session.execute(NEW_HT_TABLE)


def insert_ht(ht: HTModel) -> None:
    # Nodemcu will send maximally 1440 updates per 24h cycle (every minute), given that the temperature or humidity changes.
    # 1140 rows will add up to around 800kb of payload.
    curr_time = datetime.utcnow().replace(microsecond=0)
    params = (round(ht.temperature, 1), int(ht.humidity),
              curr_time.date(), curr_time.time())
    session.execute(
        f"INSERT INTO {KEYSPACE}.{TABLE} (temperature, humidity, measurement_date, measurement_time) VALUES (%s, %s, %s, %s);", params)


def select_all_ht() -> list[HTModel]:
    return session.execute("SELECT temperature, humidity, measurement_date, measurement_time FROM iot.ht;")


def select_ht_by_date(date: str) -> list[HTModel]:
    return session.execute(f"SELECT temperature, humidity, CAST(measurement_time as text) as measurement_time FROM iot.ht WHERE measurement_date = %s;", (date,))


if __name__ == "__main__":
    create_new_table()
