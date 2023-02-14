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
uint32_t port = 80;
String ip = "PLACEHOLDER";
DHT dht(DHTPin, DHTTYPE);

// The data is being stored two times so that
// it only sends it when the temperature or humidity changes.
float lastTemperature = 22.00;
float lastHumidity = 50.00;
float temperature;
float humidity;

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

void sendHttpsMessage(WiFiClient client, float temperature, float humidity) {
  if (temperature == lastTemperature && humidity == lastHumidity) { return; };

  Serial.println(String("Sending data to: ") + "http://" + ip + ":" + String(port));
  
  HTTPClient http;
  http.begin(client, "http://" + ip + ":" + String(port) + "/api/ht");
  http.addHeader("Content-Type", "application/json");
  
  String request = "{\"temperature\":" + String(temperature) + ", \"humidity\":" + String(humidity) + "}";

  int responseCode = http.POST(request);

  if (responseCode < 0) {
    Serial.println("ERROR -> " + http.errorToString(responseCode));
  } else {
    lastTemperature = temperature;
    Serial.println(responseCode);
    lastHumidity = humidity;
  };
  http.end();
}


void loop() {
  if (WiFi.status() != WL_CONNECTED) { 
    Serial.println("No WiFi connection.");
  }
  
  WiFiClient client;
  if(!client.connect(ip, port)) {
    Serial.println("Couldn't connect to the server.");
  }

  temperature = dht.readTemperature();
  humidity = dht.readHumidity();

  sendHttpsMessage(client, temperature, humidity);
  delay(30000);
}