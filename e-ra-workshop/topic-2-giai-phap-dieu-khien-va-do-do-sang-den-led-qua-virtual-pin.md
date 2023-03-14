---
description: Phát triển Giải pháp Điều khiển Đèn & Đo Độ sáng đèn LED trên Nền tảng E-Ra
---

# Topic 2 - Giải pháp Điều khiển và đo độ sáng đèn LED qua Virtual PIN

{% tabs %}
{% tab title="Hướng dẫn cài đặt phần mềm" %}

{% endtab %}

{% tab title="Đoạn Code hỗ trợ " %}
#### Điều khiển đèn LED qua Virtual PIN

int led = 2;\
int freq = 5000;\
int ledChannel = 0;\
int resolution = 8;

&#x20;

ledcSetup(ledChannel, freq, resolution);\
ledcAttachPin(led, ledChannel);

&#x20;

ERA\_WRITE(V0) {\
&#x20;   /\* Get value from Virtual Pin 0 and write Pin 2 \*/\
&#x20;   uint8\_t value = param.getInt();\
&#x20;   ledcWrite(ledChannel, value);  \
}

####

####

#### Đo độ sáng đèn LED qua Virtual PIN

&#x20;

/\* This function print uptime every second \*/&#x20;

void timerEvent() {

&#x20;   ERA\_LOG("Timer", "Uptime: %d", ERaMillis() / 1000L);

&#x20;   int value = analogRead(34);    &#x20;

&#x20;   ERa.virtualWrite(V1, value);

}
{% endtab %}
{% endtabs %}



