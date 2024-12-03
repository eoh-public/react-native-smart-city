# Thay đổi WiFi - WiFi Config



{% file src="../.gitbook/assets/ERa-Config-WiFi-V1.pdf" %}
File hướng dẫn tính năng Wifi Config
{% endfile %}

## 1. Yêu cầu trong firmware.

<mark style="color:red;">**Lưu ý: Với ESP32 cài đặt phiên bản stable v2.x.x để ổn định trong quá trình sử dụng.**</mark>

\- ERa library version từ v1.1.2

\- Example:

* **ESP32**: _ESP32 -> ESP32\_WiFi\_Basic_ hoặc _ESP32\_PlugNPlay_.
* **ESP8266**: _ESP8266 -> ESP8266\_WiFi\_Basic_ hoặc _ESP8266\_PlugNPlay_.

Tìm và thay thế mã Token và WiFi mặc định của Gateway:

<figure><img src="../.gitbook/assets/image (361).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (362).png" alt=""><figcaption></figcaption></figure>

Tìm đoạn code sau:

<figure><img src="../.gitbook/assets/image (363).png" alt=""><figcaption></figcaption></figure>

Bỏ ghi chú (Uncomment) dòng BUTTON\_PIN như hình dưới!

&#x20;

<figure><img src="../.gitbook/assets/image (365).png" alt=""><figcaption></figcaption></figure>

_<mark style="color:orange;">**Chú thích:**</mark>_

<mark style="color:orange;">**BUTTON\_PIN:**</mark> <mark style="color:orange;"></mark><mark style="color:orange;">cầu hình pin để kích hoạt chế độ “Wifi Config” được nối với nút nhấn</mark> <mark style="color:orange;"></mark>_<mark style="color:orange;">( ở ví dụ là: GPIO 0 – chân BOOT).</mark>_

<mark style="color:orange;">**BUTTON\_INVERT:**</mark> <mark style="color:orange;"></mark><mark style="color:orange;">cấu hình mức tích cực để kích hoạt chế độ “Wifi Config” false nếu button tích cực thấp và true nếu button tích cực cao.</mark>

<mark style="color:orange;">**BUTTON\_HOLD\_TIMEOUT:**</mark>  <mark style="color:orange;"></mark><mark style="color:orange;">cấu hình thời gian nhấn giữ nút nhấn để vào chế độ “Wifi Config”.</mark>



## 2. Hướng dẫn sử dụng chế độ WiFi Config

### 2.1. Kích hoạt WiFi Config:

**Cách 1:** Nhấn và giữ nút nhấn đã cấu hình ở trong firmware như bên trên > 5s.

**Cách 2:** Nếu gateway không kết nối WiFi trong 1-2 phút, ESP32/ESP8266 sẽ vào chế độ “WiFi Config”.



### 2.2. Các bước để thay đổi WiFi bằng web server của gateway:

**Bước 1:** Dùng điện thoại kết nối với WiFi mà gateway phát ra có dạng:

Tên WiFi:  eoh.era.xxx

Pass WiFi: Eoh@2021

_<mark style="color:orange;">**Chú thích:**</mark>_

&#x20;           <mark style="color:orange;"></mark><mark style="color:orange;">**xxx:**</mark> <mark style="color:orange;"></mark><mark style="color:orange;">là chuổi kí tự đằng sau</mark>

**Bước 2:** Từ trình duyệt điện thoại truy cập vào địa chỉ sau: 192.168.27.1:

**Bước 3:** Chọn mục Network:

<figure><img src="../.gitbook/assets/image (366).png" alt="" width="555"><figcaption></figcaption></figure>

**Bước 4:** Chọn mục Scan Network:

<figure><img src="../.gitbook/assets/image (367).png" alt="" width="446"><figcaption></figcaption></figure>

**Bước 5:** Chọn tên WiFi mới cần kết nối, nhập Password và nhấn Save:

(Chọn thêm WiFi 2 và nhập Password 2 để thêm WiFi backup)

<figure><img src="../.gitbook/assets/image (369).png" alt="" width="498"><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (370).png" alt="" width="452"><figcaption></figcaption></figure>

_<mark style="color:orange;">**Chú thích:**</mark>_

&#x20;           <mark style="color:orange;">**- SSID:**</mark> <mark style="color:orange;"></mark><mark style="color:orange;">Tên WiFi kết nối chính</mark>

&#x20;           _<mark style="color:orange;">**-**</mark>_<mark style="color:orange;">**&#x20;**</mark><mark style="color:orange;">**Password:**</mark> <mark style="color:orange;"></mark><mark style="color:orange;">Mật khẩu của WiFi kết nối chính</mark>

&#x20;           <mark style="color:orange;">**- SSID 2:**</mark> <mark style="color:orange;"></mark><mark style="color:orange;">Tên WiFi backup</mark>

&#x20;           _<mark style="color:orange;">**-**</mark>_<mark style="color:orange;">**&#x20;**</mark><mark style="color:orange;">**Password 2:**</mark> <mark style="color:orange;"></mark><mark style="color:orange;">Mật khẩu WiFi backup</mark>

**Bước 6:** Đợi quá trình kết nối WiFi mới hoàn tất.

**Bước 7:** Kiểm tra lại kết nối từ gateway lên E-Ra App.

Quá trình kết nối lại WiFi cho gateway đã hoàn tất.
