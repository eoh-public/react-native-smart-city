---
description: >-
  Phát triển giải pháp đọc cảm biến ánh sáng, chất lượng không khí, đọc cảm biến
  mưa, độ ẩm đất và cảnh báo với còi, điều khiển bơm
---

# Xây dựng Nông trại Thông minh trên Nền tảng E-Ra



{% tabs %}
{% tab title="Hướng dẫn cài đặt phần mềm" %}
### Cài đặt Arduino và thư viện Esp32 / Era eoh

{% file src="../.gitbook/assets/E-Ra Workshop_Software Installation Guide.pdf" %}

### Cài đặt thư viện DHT20 nhiệt độ, độ ẩm

Sketch > Include Library > **Manage Libraries**

![](<../.gitbook/assets/image (74).png>)

Trong mục search, điền vào **dht20**

Chọn install thư viện thứ 2 **DHT20 by **_**Rob**_** Tillaart**

![](<../.gitbook/assets/image (75) (1).png>)
{% endtab %}

{% tab title="Full code hỗ trợ" %}
### **Source code**

Tìm và đặt dưới ![](<../.gitbook/assets/image (2).png>)

```
#include <DHT20.h>
DHT20 dht;

void initDHT() {
    dht.begin();
}

void readDHT() {
    if (dht.isMeasuring()) {
        return;
    }
    if (dht.readData() < 0) {
        return;
    }
    if (dht.convert() == DHT20_OK) {
        ERa.virtualWrite(V0, dht.getHumidity());
        ERa.virtualWrite(V1, dht.getTemperature());
    }
    dht.requestData();
}

/* This function print uptime every second */
void timerEvent() {
    readDHT();
    ERA_LOG("Timer", "Uptime: %d", ERaMillis() / 1000UL);
}

// SRF
const uint8_t trigSRF = 26;
const uint8_t echoSRF = 18;

// Servo
const uint8_t pinServo = 15;
const uint8_t channelServo = 8;
const uint32_t freqServo = 50;
const uint8_t resolution = 16;

bool state = false;
int targetDegree = 90;
unsigned long distanceMax = 15;

// Init srf and servo
void initSRFAndServo() {
    // SRF
    pinMode(trigSRF, OUTPUT);
    pinMode(echoSRF, INPUT);

    // Servo  
    ledcSetup(channelServo, freqServo, resolution);
    ledcAttachPin(pinServo, channelServo);
    writeServo(0);
}

unsigned long getDistance() {
    unsigned long duration = 0;

    digitalWrite(trigSRF, LOW);
    delayMicroseconds(2);
    digitalWrite(trigSRF, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigSRF, LOW);

    duration = pulseIn(echoSRF, HIGH, 10000UL);
    /* Speed of sound: 343.2 m/s -> 29.1375 us/cm */
    return uint32_t(duration / 2 / 29.1375f);
}

void writeServo(int degree) {
    int pulseUs = ERaMapNumberRange(degree, 0, 180, 500, 2500);
    int duty = ERaMapNumberRange(pulseUs, 0, 20000, 0, 65535);
    ledcWrite(channelServo, duty);
}

// Srf event
void srfEvent() {
    static bool prevState = false;
    unsigned long distance = getDistance();
    state = (distance && (distance <= distanceMax));
    if (state) {
        writeServo(targetDegree);
    }
    else {
        writeServo(0);
    }
    if (state == prevState) {
        return;
    }
    prevState = state;
    ERa.virtualWrite(V2, state);
}

void setup() {
    /* Setup debug console */
    Serial.begin(115200);

    /* Initialize */
    initDHT();
    initSRFAndServo();

    /* Initializing the ERa library. */
    ERa.begin(ssid, pass);

    /* Setup timer called function every second */
    timer.setInterval(1000L, timerEvent);
    timer.setInterval(100L, srfEvent);
}

void loop() {
    ERa.run();
    timer.run();
}
```
{% endtab %}

{% tab title="Nội Dung E-Ra Workshop" %}
## Tài liệu Thuyết trình

## Video E-Ra Workshop


{% endtab %}
{% endtabs %}


