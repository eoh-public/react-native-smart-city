---
description: Phát triển Giải pháp Điều khiển Đèn & Đo Độ sáng đèn LED trên Nền tảng E-Ra
---

# Topic 2 - Giải pháp Điều khiển và đo độ sáng đèn LED qua Virtual PIN

{% tabs %}
{% tab title="Hướng dẫn cài đặt phần mềm" %}
{% file src="../.gitbook/assets/E-Ra Workshop_Topic 2_Software Installation Guide.pdf" %}
{% endtab %}

{% tab title="Đoạn Code hỗ trợ " %}


![](../.gitbook/assets/image.png)

####

![](<../.gitbook/assets/image (2).png>)

```
int led = 2;
int freq = 5000;
int ledChannel = 0;
int resolution = 8;

ERaTimer timer;

/* This function print uptime every second */
void timerEvent() {
    ERA_LOG("Timer", "Uptime: %d", ERaMillis() / 1000L);
    int value = analogRead(34);
    ERa.virtualWrite(V1, value);
}

void setup() {
    /* Setup debug console */
    Serial.begin(115200);

    ERa.begin(ssid, pass);

    /* Setup timer called function every second */
    timer.setInterval(1000L, timerEvent);

    ledcSetup(ledChannel, freq, resolution);
    ledcAttachPin(led, ledChannel);
}

void loop() {
    ERa.run();
    timer.run();
}

ERA_WRITE(V0) {
    /* Get value from Virtual Pin 0 and write Pin 2 */
    uint8_t value = param.getInt();
    ledcWrite(ledChannel, value);  
}
```
{% endtab %}
{% endtabs %}



