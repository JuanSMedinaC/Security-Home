#include <Wire.h>
#define echoPin 2               // CHANGE PIN NUMBER HERE IF YOU WANT TO USE A DIFFERENT PIN
#define trigPin 4               // CHANGE PIN NUMBER HERE IF YOU WANT TO USE A DIFFERENT PIN
long duration, distance;
#include <WiFi.h>
#include <HTTPClient.h>


const char* ssid = "FAMILIA-MEDINA";
const char* password = "famedina1530";
const long sensorID = 1;
const long alarmID = 1;
int count=0;
String url = "http://192.168.10.17:8080/reading/sensor/add";

void setup(){
  Serial.begin (9600);
  WiFi.mode(WIFI_STA);
  initWiFi();
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

}
void loop(){
  count=count+1;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration / 58.2;
  if (distance<30){
    
  }
  String disp = String(distance);
  Serial.print("Distance: ");
  Serial.print(disp);
  Serial.println(" cm");

  Serial.print("Count: ");
  Serial.println(count);
  
  if(count > 3){
    post(disp);
    count=0;
  }
  
  delay(250);
}

void post(String disp){
  HTTPClient http;
  http.begin(url.c_str());
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", (String)sensorID);
  String body= "{\"sensorValues\":\""+disp+"\",\"units\":\"cm\"}";
  Serial.println(body);
  //ENVIO DE DATOS
  int httpResponseCode = http.POST(body);
  //RECEPCIÓN
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();

}

void initWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println("Connected!!");
  Serial.println(WiFi.localIP());
  
}