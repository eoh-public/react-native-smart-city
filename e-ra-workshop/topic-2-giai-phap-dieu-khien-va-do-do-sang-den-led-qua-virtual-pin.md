---
description: Phát triển Giải pháp Điều khiển Đèn & Đo Độ sáng đèn LED trên Nền tảng E-Ra
---

# Topic 2 - Giải pháp Điều khiển và đo độ sáng đèn LED qua Virtual PIN

{% tabs %}
{% tab title="Hướng dẫn cài đặt phần mềm" %}

{% endtab %}

{% tab title="Đoạn Code hỗ trợ " %}
#### Điều khiển đèn LED qua Virtual PIN

```
int led = 2;
int freq = 5000;
int ledChannel = 0;
int resolution = 8;
```



```
ledcSetup(ledChannel, freq, resolution);
ledcAttachPin(led, ledChannel);
```



```
ERA_WRITE(V0) {
    /* Get value from Virtual Pin 0 and write Pin 2 */
    uint8_t value = param.getInt();
    ledcWrite(ledChannel, value);  
}
```

####

####

#### Đo độ sáng đèn LED qua Virtual PIN

&#x20;

```
/* This function print uptime every second */
void timerEvent() {
    ERA_LOG("Timer", "Uptime: %d", ERaMillis() / 1000L);
    int value = analogRead(34);
    ERa.virtualWrite(V1, value);
}
```
{% endtab %}
{% endtabs %}



