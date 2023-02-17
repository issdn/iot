FROM python:3.11
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY /src/iot_server ./src/iot_server
COPY iot-token.json .
COPY secure-connect-iot.zip .
WORKDIR /app/src
CMD ["uvicorn", "iot_server.main:app", "--reload", "--host", "0.0.0.0"]