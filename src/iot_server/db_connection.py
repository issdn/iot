from cassandra.cluster import Cluster, Session
from cassandra.auth import PlainTextAuthProvider
from os.path import abspath
import json

PATH_TO_SECURE_CONNECT = abspath("../secure-connect-iot.zip")
PATH_TO_SECURE_TOKEN = abspath("../iot-token.json")

with open(PATH_TO_SECURE_TOKEN, "r") as json_file:
  iot_token_file = json.load(json_file)

cloud_config= {
  'secure_connect_bundle': PATH_TO_SECURE_CONNECT
}

def get_new_session() -> Session:
  auth_provider = PlainTextAuthProvider(iot_token_file["clientId"], iot_token_file["secret"])
  cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
  return cluster.connect()
