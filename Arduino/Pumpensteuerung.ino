#define Pumpe1 D5
#define Pumpe2 D6
#define Pumpe3 D7
#define Pumpe4 D8

void setup() {
 pinMode(Pumpe1, OUTPUT); // Port aus Ausgang schalten
 pinMode(Pumpe2, OUTPUT);
 pinMode(Pumpe3, OUTPUT);
 pinMode(Pumpe4, OUTPUT);
 }

void loop() {
 delay(1000);
 digitalWrite(Pumpe1, HIGH);
 delay(2000);
 digitalWrite(Pumpe1, LOW);
 delay(1000);
 digitalWrite(Pumpe2, HIGH);
 delay(2000); 
 digitalWrite(Pumpe2, LOW);
 delay(1000);
 digitalWrite(Pumpe3, HIGH);
 delay(2000);
 digitalWrite(Pumpe3, LOW);
 delay(1000);
 digitalWrite(Pumpe4, HIGH);
 delay(2000);
 digitalWrite(Pumpe4, LOW);
 }
