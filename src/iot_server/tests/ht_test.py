from iot_server.database_crud_functions import insert_ht

def test_add_ht_to_database_OK():
    insert_ht({"temperature": 0, "humidity": 0})

# def test_add_ht_to_database_FAIL():
#     insert_ht({"temperature": "SHOULD BE FLOAT", "humidity": "SHOULD BE FLOAT"})