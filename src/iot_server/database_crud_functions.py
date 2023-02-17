from iot_server.db_connection import get_new_session
from iot_server.models import HT
from datetime import datetime
from cassandra.query import dict_factory

KEYSPACE = "iot"
TABLE = "ht"

session = get_new_session()
session.row_factory = dict_factory

def create_new_table():
    NEW_HT_TABLE = f"""
    CREATE TABLE {KEYSPACE}.{TABLE} (
        temperature float,
        humidity float,
        measurement_date date,
        measurement_time time,
        PRIMARY KEY ((measurement_date), measurement_time)
    ) WITH CLUSTERING ORDER BY (measurement_time DESC); 
    """
    session.execute(f"DROP TABLE IF EXISTS {KEYSPACE}.{TABLE};")
    session.execute(NEW_HT_TABLE)

def insert_ht(ht: HT) -> None:
    # Nodemcu will send maximally 2880 updates per 24h cycle (every 30 seconds), given that the temperature or humidity changes.
    curr_time = datetime.utcnow().replace(microsecond=0)
    params = (round(ht.temperature, 2), ht.humidity, curr_time.date(), curr_time.time())
    session.execute(f"INSERT INTO {KEYSPACE}.{TABLE} (temperature, humidity, measurement_date, measurement_time) VALUES (%s, %s, %s, %s);", params)

def select_all_ht() -> list[HT]:
    return session.execute("SELECT temperature, humidity, measurement_date, measurement_time FROM iot.ht;")

def select_ht_by_date(date: str) -> list[HT]:
    return session.execute(f"SELECT temperature, humidity, CAST(measurement_time as text) as measurement_time FROM iot.ht WHERE measurement_date = %s;", (date,))

def delete_all_unrealistic_ht() -> None:
    session.execute(f"DELETE FROM {KEYSPACE}.{TABLE} WHERE temperature < -50;")

if __name__ == "__main__":
    create_new_table()