#include <ESP8266WiFi.h>

const char* ssid = "baron"; //Hier SSID eures WLAN Netzes eintragen
const char* password = "...."; //Hier euer Passwort des WLAN Netzes eintragen

void setup()
{
  Serial.begin(115200);
  Serial.println();

  WiFi.begin(ssid, password);

  Serial.print("Verbinde mich mit Netz: ");
  Serial.println(ssid);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
 //digitalWrite(LED, LOW); //Led port ausschalten
 //delay(5000); //5 Sek Pause
 //digitalWrite(LED, HIGH); //Led port einschlaten
 //delay(5000);
 }
