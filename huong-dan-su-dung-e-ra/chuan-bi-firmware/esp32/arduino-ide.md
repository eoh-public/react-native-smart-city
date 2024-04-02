# Arduino IDE

### 1. Cài đặt driver&#x20;

Tiến hành cài đặt thêm những driver sau:&#x20;

Với ESP32: [CP210x](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)&#x20;

### 2. Arduino IDE

<figure><img src="../../../.gitbook/assets/image (156).png" alt=""><figcaption></figcaption></figure>

Truy cập [Software | Arduino](https://www.arduino.cc/en/software) và tải bản Arduino IDE(Legacy) tương thích với hệ điều hành.&#x20;

### 3. Add Boards Manager ESP32 cho Arduino IDE

<figure><img src="../../../.gitbook/assets/image (56).png" alt=""><figcaption></figcaption></figure>

* Mở Arduino IDE&#x20;
* Vào File -> Preferences&#x20;

<figure><img src="../../../.gitbook/assets/image (306).png" alt=""><figcaption></figcaption></figure>

Trong Popup Preference, tìm đến “Additional Boards Manager URLs” thêm đường dẫn sau và nhấn OK.&#x20;

ESP32:[ ](https://github.com/espressif/arduino-esp32/raw/gh-pages/package\_esp32\_dev\_index.json)[https://github.com/espressif/arduino-esp32/raw/gh-pages/package\_esp32\_index.json](https://github.com/espressif/arduino-esp32/blob/gh-pages/package\_esp32\_index.json)

<mark style="color:red;">Thêm đường dẫn tương ứng của từng board, mỗi đường dẫn cách nhau bằng dấu “,”</mark>&#x20;

<figure><img src="../../../.gitbook/assets/image (60).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Board:… -> Boards Manager …

<figure><img src="../../../.gitbook/assets/image (52).png" alt=""><figcaption></figcaption></figure>

Trong Boards Manager, tìm ESP32 -> nhấn install để thêm package Boards ESP32 vào Arduino IDE

|          | ESP32  | STM32                   |
| -------- | ------ | ----------------------- |
| Search   | ESP32  | STM32                   |
| Package  | esp32  | STM32 MCU based boards  |

### 4. Thêm thư viện vào Arduino IDE

<figure><img src="../../../.gitbook/assets/image (100).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Manage Libraries

<figure><img src="../../../.gitbook/assets/image (301).png" alt=""><figcaption></figcaption></figure>

Tìm “<mark style="color:red;">Era Enabler</mark>” sau đấy chọn version mới nhất và tiến hành install.

<figure><img src="../../../.gitbook/assets/image (176).png" alt=""><figcaption></figcaption></figure>

Cắm nguồn board ESP32 vào máy tính để kết nối port

<figure><img src="../../../.gitbook/assets/image (292).png" alt=""><figcaption><p><br></p></figcaption></figure>

Ấn vào dropdown để chọn board và port -> Chọn Board **" ESP32 Dev Module"** và  Chọn cổng Ports của mạch nạp ESP32

<figure><img src="../../../.gitbook/assets/image (67).png" alt=""><figcaption></figcaption></figure>

**Mở wed để tạo mới gateway ESP32 vào E-ra**

{% content-ref url="../../thao-tac-tren-web-e-ra-platform/tao-moi-gateway/esp32_-arduino.md" %}
[esp32\_-arduino.md](../../thao-tac-tren-web-e-ra-platform/tao-moi-gateway/esp32\_-arduino.md)
{% endcontent-ref %}
