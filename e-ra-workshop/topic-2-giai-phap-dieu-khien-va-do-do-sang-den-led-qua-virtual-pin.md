---
description: Phát triển Giải pháp Điều khiển Đèn & Đo Độ sáng đèn LED trên Nền tảng E-Ra
---

# Topic 2 - Giải pháp Điều khiển và đo độ sáng đèn LED qua Virtual PIN

{% tabs %}
{% tab title="Hướng dẫn cài đặt phần mềm" %}
{% file src="../.gitbook/assets/E-Ra Workshop_Topic 2_Software Installation Guide.pdf" %}

{% embed url="https://youtu.be/mWG3SLdxtjo" %}
Video hướng dẫn Cài đặt phần mềm thực hành E-Ra Workshop
{% endembed %}
{% endtab %}

{% tab title="Đoạn Code hỗ trợ " %}
E-ra điều khiển độ sáng Led

![](<../.gitbook/assets/image (286).png>)



E-ra đọc giá trị ánh sáng

![](<../.gitbook/assets/image (284).png>)



Source code

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
    ERa.virtualWrite(V1, 4095 - value); // Reverse
}

ERA_WRITE(V0) {
    /* Get value from Virtual Pin 0 and write Pin 2. */
    uint8_t value = param.getInt();
    ledcWrite(ledChannel, value*255/100); // Range 0 - 255
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

```
{% endtab %}

{% tab title="Nội Dung E-Ra Workshop" %}
## Tài liệu Thuyết trình

{% file src="../.gitbook/assets/E-Ra Workshop_Topic 2 Presentation.pdf" %}
Tài liệu E-Ra Workshop - Topic 2
{% endfile %}

## Video E-Ra Workshop

{% embed url="https://youtu.be/XuTbz_fvgOg" %}
E-Ra Workshop Topic 2
{% endembed %}
{% endtab %}
{% endtabs %}



