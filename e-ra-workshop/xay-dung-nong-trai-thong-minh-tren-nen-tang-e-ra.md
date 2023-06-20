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
ERaTimer::iterator timer1;

const uint8_t buzzerPin = 13;
const uint8_t rainPin = 34;
const uint8_t co2Pin = 33;
const uint8_t soilPin = 32;

const int thresholdSoil = 70;
const int thresholdRain = 2500;

void alarmTone() {
    static bool on = false;
    if (on = !on) {
        tone(buzzerPin, 1500);
    }
    else {
        noTone(buzzerPin);
    }
}

void rainMeas() {
    bool state = (analogRead(rainPin) < thresholdRain);
    ERa.virtualWrite(V0, state);
}

void co2Meas() {
    float rLoad = 10.0f;
    float rZero = 10.0f;
    float paramA = 110.47f;
    float paramB = -2.862f;
    float resistance = (((4095.0f / analogRead(co2Pin)) * 3.3f - 1.0f) / rLoad);
    float ppm = (paramA * pow((resistance / rZero), paramB));
    ERa.virtualWrite(V1, isnan(ppm) ? 0.0f : ppm);
}

void soilMeas() {
    uint8_t percentage = -ERaMapNumberRange((int)analogRead(soilPin), 2000, 2700, -100, 0);
    bool alarm = (percentage >= thresholdSoil);
    if (alarm) {
        timer1.enable();
    }
    else {
        noTone(buzzerPin);
        timer1.disable();
    }
    ERa.virtualWrite(V2, percentage);
    ERa.virtualWrite(V3, alarm);
}

/* This function print uptime every second */
void timerEvent() {
    rainMeas(); co2Meas(); soilMeas();
    ERA_LOG("Timer", "Uptime: %d", ERaMillis() / 1000L);
}

void setup() {
    /* Setup debug console */
    Serial.begin(115200);

    /* Setup GPIO */
    pinMode(rainPin, ANALOG);
    pinMode(co2Pin, ANALOG);
    pinMode(soilPin, ANALOG);
    setToneChannel(8);
    tone(buzzerPin, 0, 1000);

    /* Initializing the ERa library. */
    ERa.begin(ssid, pass);

    /* Setup timer called function every second */
    timer.setInterval(1000L, timerEvent);
    timer1 = timer.setInterval(500L, alarmTone);
    timer1.disable();
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



