# Arduino IDE

### 1. Cài đặt driver&#x20;

Tiến hành cài đặt thêm những driver sau:&#x20;

Với STM32: [ST-link](https://www.st.com/en/development-tools/stsw-link009.html)&#x20;

### 2.  Arduino IDE

<figure><img src="../../../.gitbook/assets/image (156).png" alt=""><figcaption></figcaption></figure>

Truy cập [Software | Arduino](https://www.arduino.cc/en/software) và tải bản Arduino IDE(Legacy) tương thích với hệ điều hành.&#x20;

### 3. Add Boards Manager STM32 cho Arduino IDE

<figure><img src="../../../.gitbook/assets/image (56).png" alt=""><figcaption></figcaption></figure>

* Mở Arduino IDE&#x20;
*   Vào File -> Preferences \


    <figure><img src="../../../.gitbook/assets/image (198).png" alt=""><figcaption></figcaption></figure>

Trong Popup Preference, tìm đến “Additional Boards Manager URLs” thêm đường dẫn sau và nhấn OK.&#x20;

STM32: [https://github.com/stm32duino/BoardManagerFiles/raw/main/package\_stmicroelectronics\_index.json](https://github.com/stm32duino/BoardManagerFiles/raw/main/package\_stmicroelectronics\_index.json),&#x20;

<mark style="color:red;">Thêm đường dẫn tương ứng của từng board, mỗi đường dẫn cách nhau bằng dấu “,”</mark>&#x20;

<figure><img src="../../../.gitbook/assets/image (138).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Board:… -> Boards Manager …

<figure><img src="../../../.gitbook/assets/image (148).png" alt=""><figcaption></figcaption></figure>

Trong Boards Manager, tìm STM32 -> nhấn install để thêm package STM32 MCU based boards vào Arduino IDE

<table data-header-hidden><thead><tr><th></th><th></th><th data-hidden></th></tr></thead><tbody><tr><td> </td><td>STM32 </td><td>ESP32 </td></tr><tr><td>Search </td><td>STM32 </td><td>ESP32 </td></tr><tr><td>Package </td><td>STM32 MCU based boards </td><td>esp32 </td></tr></tbody></table>

### 4. Thêm thư viện vào Arduino IDE

<figure><img src="../../../.gitbook/assets/image (100).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Manage Libraries

<figure><img src="../../../.gitbook/assets/image (301).png" alt=""><figcaption></figcaption></figure>

Tìm “<mark style="color:red;">Era Enabler</mark>” sau đấy chọn version mới nhất và tiến hành install.



<figure><img src="../../../.gitbook/assets/image (132).png" alt=""><figcaption><p>STM32duino FreeRTOS trên Arduino IDE</p></figcaption></figure>

<figure><img src="../../../.gitbook/assets/image (117).png" alt=""><figcaption><p>TinyGSM trên Arduino IDE</p></figcaption></figure>

###

<figure><img src="../../../.gitbook/assets/image (176).png" alt=""><figcaption></figcaption></figure>

Vào File -> Examples -> ERa -> STM32 -> Gsm (Nếu dùng SIM), Wifi (Nếu dùng Wifi)

:white\_check\_mark:**Đối với board STM32:**

<mark style="color:red;">Dùng module Gsm (SIM)</mark>

<figure><img src="../../../.gitbook/assets/image (323).png" alt=""><figcaption></figcaption></figure>

* Chọn APN nhà mạng đang dùng.&#x20;
* Chọn modem SIM đang dùng.&#x20;
* Thay đổi ERA\_AUTH\_TOKEN thành token của project.&#x20;

<mark style="color:red;">Dùng module Wifi</mark>

<figure><img src="../../../.gitbook/assets/image (116).png" alt=""><figcaption></figcaption></figure>

Thay đổi thông số ERA\_AUTH\_TOKEN của project, tên wifi(ssid) và pass wifi(pass).&#x20;

**Mở wed để tạo mới gateway ESP32 vào E-ra**

{% content-ref url="../../thao-tac-tren-web-e-ra-platform/tao-moi-gateway/stm32-wifi_arduino.md" %}
[stm32-wifi\_arduino.md](../../thao-tac-tren-web-e-ra-platform/tao-moi-gateway/stm32-wifi\_arduino.md)
{% endcontent-ref %}

{% content-ref url="../../thao-tac-tren-web-e-ra-platform/tao-moi-gateway/stm32_gsm_arduino.md" %}
[stm32\_gsm\_arduino.md](../../thao-tac-tren-web-e-ra-platform/tao-moi-gateway/stm32\_gsm\_arduino.md)
{% endcontent-ref %}
