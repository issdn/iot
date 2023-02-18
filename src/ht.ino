//        _                 _
//       | |               | |
//   __ _| |__   ___  _   _| |_
//  / _` | '_ \ / _ \| | | | __|
// | (_| | |_) | (_) | |_| | |_
//  \__,_|_.__/ \___/ \__,_|\__|
//
//  Temperature measurement with DHT11 Temperature and Humidity sensor,
//  Sending the data to asp.net api with LoL1n nodemcu v3.
//
//  Sources I used:
//  Asp.net intro: https://www.youtube.com/watch?v=2Ayfi7OJhBI&t=1103s
//  Elegoo Arduino Tut: https://www.elegoo.com/en-de/blogs/arduino-projects/elegoo-mega-2560-basic-starter-kit-tutorial
//  Send every 30 seconds.

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "DHT.h"

#define DHTTYPE DHT11
#define SSID "PLACEHOLDER"
#define WIFI_PASS "PLACEHOLDER"

uint8_t DHTPin = D4;
uint32_t port = 8000;
String ip = "PLACEHOLDER";
DHT dht(DHTPin, DHTTYPE);

float temperature;
float humidity;

void httpPost(WiFiClient client, String endpoint, String request) { 
  HTTPClient http;
  http.begin(client, "http://" + ip + ":" + String(port) + endpoint);
  http.addHeader("Content-Type", "application/json");

  int responseCode = http.POST(request);

  if (responseCode < 0) {
    Serial.println("ERROR: " + http.errorToString(responseCode));
  } else {
    Serial.println("Response: " + String(responseCode));
  };
  http.end();
}

void sendPostRequest(String endpoint, String request){
  WiFiClient client;
  while (!client.connect(ip, port)) {
    Serial.println("Couldn't connect to the server.");
    delay(30000);
  }
  httpPost(client, endpoint, request);
}

void setup() {
  Serial.begin(115200);
  while (!Serial);
  pinMode(DHTPin, INPUT);
  dht.begin();
  WiFi.begin(SSID, WIFI_PASS);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) { delay(500); };
  Serial.println("Connected.");
}

void loop() {
  delay(60000);

  if (WiFi.status() != WL_CONNECTED) { 
    Serial.println("No WiFi connection.");
  }
  
  WiFiClient client;
  while(!client.connect(ip, port)) {
    Serial.println("Couldn't connect to the server.");
    delay(30000);
  }

  temperature = dht.readTemperature();
  humidity = dht.readHumidity();

  String request = "{\"temperature\":" + String(temperature) + ", \"humidity\":" + String(humidity) + "}";
  Serial.println("/api/ht | " + request);
  sendPostRequest("/api/ht", request);
}