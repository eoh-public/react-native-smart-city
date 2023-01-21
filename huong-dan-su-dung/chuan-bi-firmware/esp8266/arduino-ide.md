# Arduino IDE

### 1.. Cài đặt driver&#x20;

Tiến hành cài đặt thêm những driver sau:&#x20;

Với ESP8266: [CP210x](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)&#x20;

### 2. Arduino IDE

<figure><img src="../../../.gitbook/assets/image (36) (1) (1).png" alt=""><figcaption></figcaption></figure>

Truy cập [Software | Arduino](https://www.arduino.cc/en/software) và tải bản Arduino IDE(Legacy) tương thích với hệ điều hành.&#x20;

### 3. Add Boards Manager ESP8266 cho Arduino IDE

<figure><img src="../../../.gitbook/assets/image (34).png" alt=""><figcaption></figcaption></figure>

* Mở Arduino IDE&#x20;
* Vào File -> Preferences&#x20;

<figure><img src="../../../.gitbook/assets/image (66).png" alt=""><figcaption></figcaption></figure>

Trong Popup Preference, tìm đến “Additional Boards Manager URLs” thêm đường dẫn sau và nhấn OK.&#x20;

ESP8266: [http://arduino.esp8266.com/stable/package\_esp8266com\_index.json](http://arduino.esp8266.com/stable/package\_esp8266com\_index.json) <mark style="color:red;"></mark>&#x20;

<figure><img src="../../../.gitbook/assets/image (54) (1).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Board:… -> Boards Manager …

<figure><img src="../../../.gitbook/assets/image (60) (1).png" alt=""><figcaption></figcaption></figure>

Trong Boards Manager, tìm ESP8266 -> nhấn install để thêm package Boards ESP8266 vào Arduino IDE

### 4. Thêm thư viện vào Arduino IDE

<figure><img src="../../../.gitbook/assets/image (25) (1).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Manage Libraries

<figure><img src="../../../.gitbook/assets/image (7) (2).png" alt=""><figcaption></figcaption></figure>

Tìm “<mark style="color:red;">Era Enabler</mark>” sau đấy chọn version mới nhất và tiến hành install.

<figure><img src="../../../.gitbook/assets/image (29) (1).png" alt=""><figcaption></figcaption></figure>

Tại Tools -> Manage Libraries tiếp tục Tìm “<mark style="color:red;">Preferences by vshymansky</mark>” sau đấy chọn version mới nhất và tiến hành install. \


<figure><img src="../../../.gitbook/assets/image (56) (1).png" alt=""><figcaption></figcaption></figure>

Cắm nguồn board ESP8266 vào máy tính để kết nối port

<figure><img src="../../../.gitbook/assets/image (68) (1).png" alt=""><figcaption><p><br></p></figcaption></figure>

Ấn vào dropdown để chọn board và port -> Chọn Board **" Generic ESP8266 Module"** và  Chọn cổng Ports của mạch nạp ESP8266

<figure><img src="../../../.gitbook/assets/image (64) (1).png" alt=""><figcaption></figcaption></figure>

**Mở wed để tạo mới gateway ESP32 vào E-ra**

{% content-ref url="../../thao-tac-tren-e-ra-platform/tao-moi-gateway/esp8266_arduino.md" %}
[esp8266\_arduino.md](../../thao-tac-tren-e-ra-platform/tao-moi-gateway/esp8266\_arduino.md)
{% endcontent-ref %}
