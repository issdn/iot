from iot_server.db_connection import get_new_session
from iot_server.models import HT
from datetime import datetime

KEYSPACE = "iot"
TABLE = "ht"

session = get_new_session()

def create_new_table():
    NEW_HT_TABLE = f"""
    CREATE TABLE IF NOT EXISTS {KEYSPACE}.{TABLE} (
        temperature float,
        humidity float,
        measured_at timestamp PRIMARY KEY
    ); 
    """
    session.execute(NEW_HT_TABLE)

def insert_ht(ht: HT) -> None:
    params = (ht.temperature, ht.humidity, datetime.now(),)
    session.execute(f"INSERT INTO {KEYSPACE}.{TABLE} (temperature, humidity, measured_at) VALUES (%s, %s, %s);", params)

def select_all_ht() -> list[HT]:
    return session.execute("SELECT measured_at, temperature, humidity FROM iot.ht;")

def delete_all_unrealistic_ht() -> None:
    session.execute(f"DELETE FROM {KEYSPACE}.{TABLE} WHERE temperature < -50;")