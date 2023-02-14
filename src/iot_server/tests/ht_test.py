from iot_server.database_crud_functions import insert_ht, select_all_ht
import pytest
import cassandra

def test_add_ht_to_database_OK():
    insert_ht({"temperature": -200, "humidity": -200})

def test_add_ht_to_database_FAIL():
    with pytest.raises(cassandra.InvalidRequest):
        insert_ht({"temperature": "SHOULD BE FLOAT", "humidity": "SHOULD BE FLOAT"})

def test_select_all_ht_OK():
    assert isinstance(insert_ht(), list)