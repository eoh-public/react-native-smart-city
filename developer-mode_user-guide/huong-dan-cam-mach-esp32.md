# Hướng dẫn cắm mạch ESP32

{% file src="../.gitbook/assets/Hướng dẫn lắp mạch ESp32.pdf" %}

1.ESP32 modul

* Sơ đồ chân module ESP32 :

<figure><img src="../.gitbook/assets/Picture1.png" alt=""><figcaption></figcaption></figure>

Lưu ý :&#x20;

&#x20;   \-Nguồn cấp: 5V hoặc dây Micro USB.&#x20;

Tham khảo thêm:&#x20;

{% embed url="https://randomnerdtutorials.com/esp32-pinout-reference-gpios/" %}

2.Breakboard:&#x20;

&#x20; \- Cấu tạo Breakboard:&#x20;

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

\- Có thể dùng đồng hồ vạn năng để kiểm tra các chân trên Breakboard có nối với nhau hay không.&#x20;

&#x20;&#x20;

3.Lắp đặt Demo:

&#x20; \- Lưu ý chung :&#x20;

| Chức năng | Màu dây                     |
| --------- | --------------------------- |
| 3V3       | Màu đỏ                      |
| GND       | Màu đen                     |
| Tín hiệu  | Màu xanh dương, màu xanh lá |

&#x20;3.1.Bộ nút nhấn kèm đèn trạng thái:&#x20;

&#x20; 3.1.1.Cấu tạo nút ấn:&#x20;

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

&#x20; 3.1.2.Cách đấu nối nút ấn:&#x20;

&#x20; \- Linh kiện:&#x20;

&#x20;     \+ 1 led (G2-D2).&#x20;

&#x20;     \+ 1 Nút ấn (G0-D0).&#x20;

&#x20;     \+ 1 điện trở 330Ω, 1 điện trở 10KΩ.&#x20;

<figure><img src="../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

3.2.Đèn led (on/off/dimming):&#x20;

&#x20;   \- Linh kiện:&#x20;

&#x20;       \+ 1 điện trở 330Ω.&#x20;

&#x20;       \+ 1 led: SP-IO36-A0 (PWM).&#x20;

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

3.3.Biến trở:&#x20;

&#x20;   \- Linh kiện:&#x20;

&#x20;       \+ 1 điện trở 330Ω.&#x20;

&#x20;       \+ 1 led: G18-D18.&#x20;

&#x20;       \+ 1 biến trở 500KΩ: SN-IO39-A3.&#x20;

![](<../.gitbook/assets/image (10).png>)
