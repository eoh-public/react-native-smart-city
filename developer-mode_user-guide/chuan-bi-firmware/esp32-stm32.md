# ESP32, STM32



## 1. Chuẩn bị firmware&#x20;

### 1.1. Cài đặt driver&#x20;

Tiến hành cài đặt thêm những driver sau:&#x20;

Với ESP32: [CP210x](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)&#x20;

Với STM32: [ST-link](https://www.st.com/en/development-tools/stsw-link009.html)&#x20;

### 1.2. Visual Studio Code&#x20;

<figure><img src="../../.gitbook/assets/image (43).png" alt=""><figcaption></figcaption></figure>

Truy cập [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/) và tải bản VS Code tương thích với hệ điều hành.&#x20;

#### 1.2.1. PlatformIO

<figure><img src="../../.gitbook/assets/image (39).png" alt=""><figcaption></figcaption></figure>

* Mở VS Code chọn Extensions&#x20;
* Tìm PlatformIO IDE&#x20;
* Tiến hành Install PlatformIO&#x20;

#### 1.2.2. Tạo project

<figure><img src="../../.gitbook/assets/image (9) (1).png" alt=""><figcaption></figcaption></figure>

* Trong VS Code chọn PlatformIO&#x20;
* PlatformIO: Quick Access -> PIO Home -> Open&#x20;
* Chọn New Project để tạo project mới -> Xuất hiện popup Project Wizard như hình dưới&#x20;

<figure><img src="../../.gitbook/assets/image (31).png" alt=""><figcaption></figcaption></figure>

Trong Project Wizard: vui lòng nhập tên Project, chọn Board, Framework, Location lưu project và tiến hành tạo Project



|            | ESP32                       | STM32              |
| ---------- | --------------------------- | ------------------ |
| Board      | Espressif ESP32 Dev Module  | Black STM32F407VG  |
| Framework  | Arduino                     | Arduino            |

<mark style="color:red;">Lưu ý: Hiện tại bản Pre-Release support ESP32, ESP8266, STM32, Raspberry Pi</mark>

#### 1.2.3.Thêm thư viện vào Project

<figure><img src="../../.gitbook/assets/image (26).png" alt=""><figcaption></figcaption></figure>

* Trong PlatformIO Home chọn Libraries&#x20;
* Tìm “Era EoH”&#x20;
* Chọn “ERa by EoH Ltd”&#x20;

<figure><img src="../../.gitbook/assets/image (38).png" alt=""><figcaption></figcaption></figure>

Bảng Registry hiện ra sau đấy chọn version mới nhất và “Add to Project”

<figure><img src="../../.gitbook/assets/image (24) (1).png" alt=""><figcaption></figcaption></figure>

Popup “Add project dependency” -> tiến hành chọn project và click “Add”

<figure><img src="../../.gitbook/assets/image (1) (3).png" alt=""><figcaption></figcaption></figure>

Trong bảng Registry -> Examples -> chọn example tương ứng của từng board -> copy nội dung của example

<figure><img src="../../.gitbook/assets/image (46).png" alt=""><figcaption></figcaption></figure>

Paste nội dung của example vào file main.cpp

|          | ESP32  | STM32                                                  |
| -------- | ------ | ------------------------------------------------------ |
| Example  | Basic  | <p>Gsm (nếu dùng SIM) </p><p>Wifi (nếu dùng Wifi) </p> |

:white\_check\_mark: **Đối với board ESP32**

<mark style="color:red;">Dùng module Gsm (SIM)</mark>

<figure><img src="../../.gitbook/assets/image (42).png" alt=""><figcaption></figcaption></figure>

* Chọn APN nhà mạng đang dùng.&#x20;
* Chọn modem SIM đang dùng.&#x20;
* Thay đổi ERA\_AUTH\_TOKEN thành token của project.&#x20;

<mark style="color:red;">Dùng module WiFi</mark>

<figure><img src="../../.gitbook/assets/image (50).png" alt=""><figcaption></figcaption></figure>

Thay đổi thông số ERA\_AUTH\_TOKEN của project, tên wifi(ssid) và pass wifi(pass).&#x20;

<mark style="color:red;">**Lưu ý**</mark>

Đối với board STM32 vui lòng cài đặt thêm thư viện bỗ trợ ở mục 3.2.&#x20;

<figure><img src="../../.gitbook/assets/image (44).png" alt=""><figcaption></figcaption></figure>

Nhấn vào dấu :heavy\_check\_mark: dưới thanh taskbar để tiến hành build chương trình.

#### 1.2.4. Upload code

<figure><img src="../../.gitbook/assets/image (37) (1).png" alt=""><figcaption></figcaption></figure>

Mở file platformio.ini của project và tiến hành thay đổi upload\_port sang cổng COM (Window OS) hoặc “/dev/ttyUSB” (Unix-Based OS) của mạch nạp. <mark style="color:red;">(Bỏ qua bước này nếu dùng STM32)</mark>

<figure><img src="../../.gitbook/assets/image (5) (3).png" alt=""><figcaption></figcaption></figure>

* Nhấn vào dấu --> dưới thanh taskbar để tiến hành upload chương trình.&#x20;

<mark style="color:red;">**Lưu ý với board ESP32**</mark>&#x20;

Vào chế độ bootloader (chế độ upload code) trước khi tiến hành upload chương trình bằng cách:&#x20;

<figure><img src="../../.gitbook/assets/image (20) (1).png" alt=""><figcaption></figcaption></figure>

* Mở serial monitor (click vào biểu tượng như hình trên).&#x20;
* Nhấn giữ nút BOOT đồng thời nhấn và nhả nút RST/EN trên board ESP32.

&#x20;

<figure><img src="../../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

Tiến hành upload chương trình&#x20;

### 1.3. Arduino IDE

<figure><img src="../../.gitbook/assets/image (36) (1) (1).png" alt=""><figcaption></figcaption></figure>

Truy cập [Software | Arduino](https://www.arduino.cc/en/software) và tải bản Arduino IDE(Legacy) tương thích với hệ điều hành.&#x20;

#### 1.3.1. Add Boards Manager ESP32 cho Arduino IDE

<figure><img src="../../.gitbook/assets/image (34).png" alt=""><figcaption></figcaption></figure>

* Mở Arduino IDE&#x20;
* Vào File -> Preferences&#x20;

<figure><img src="../../.gitbook/assets/image (45).png" alt=""><figcaption></figcaption></figure>

Trong Popup Preference, tìm đến “Additional Boards Manager URLs” thêm đường dẫn sau và nhấn OK.&#x20;

ESP32:[ , ](https://github.com/espressif/arduino-esp32/raw/gh-pages/package\_esp32\_dev\_index.json)[https://github.com/espressif/arduino-esp32/raw/gh-pages/package\_esp32\_dev\_index.json](https://github.com/espressif/arduino-esp32/raw/gh-pages/package\_esp32\_dev\_index.json)

STM32: [https://github.com/stm32duino/BoardManagerFiles/raw/main/package\_stmicroelectronics\_index.json](https://github.com/stm32duino/BoardManagerFiles/raw/main/package\_stmicroelectronics\_index.json),&#x20;

ESP8266: [http://arduino.esp8266.com/stable/package\_esp8266com\_index.json](http://arduino.esp8266.com/stable/package\_esp8266com\_index.json)&#x20;

<mark style="color:red;">Thêm đường dẫn tương ứng của từng board, mỗi đường dẫn cách nhau bằng dấu “,”</mark>&#x20;

<figure><img src="../../.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Board:… -> Boards Manager …

<figure><img src="../../.gitbook/assets/image (16) (1).png" alt=""><figcaption></figcaption></figure>

Trong Boards Manager, tìm ESP32 -> nhấn install để thêm package Boards ESP32 vào Arduino IDE

|          | ESP32  | STM32                   |
| -------- | ------ | ----------------------- |
| Search   | ESP32  | STM32                   |
| Package  | esp32  | STM32 MCU based boards  |

#### 1.3.2 Thêm thư viện vào Arduino IDE

<figure><img src="../../.gitbook/assets/image (25).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Manage Libraries

<figure><img src="../../.gitbook/assets/image (35).png" alt=""><figcaption></figcaption></figure>

Tìm “ERa EoH” sau đấy chọn version mới nhất và tiến hành install.

<figure><img src="../../.gitbook/assets/image (29) (1).png" alt=""><figcaption></figcaption></figure>

Vào File -> Examples -> ERa -> ESP32 -> Basic

|          | ESP32                                          | STM32                                                                             |
| -------- | ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Example  | Vào File -> Examples -> ERa -> ESP32 -> Basic  | Vào File -> Examples -> ERa -> STM32 -> Gsm (Nếu dùng SIM), Wifi (Nếu dùng Wifi)  |

:white\_check\_mark: **Đối với board ESP32**

<figure><img src="../../.gitbook/assets/image (10) (3).png" alt=""><figcaption></figcaption></figure>

Thay đổi ERA\_AUTH\_TOKEN thành token của project, tên wifi(ssid) và pass wifi(pass).

****:white\_check\_mark:**Đối với board STM32:**

<mark style="color:red;">Dùng module Gsm (SIM)</mark>

<figure><img src="../../.gitbook/assets/image (23) (1).png" alt=""><figcaption></figcaption></figure>

* Chọn APN nhà mạng đang dùng.&#x20;
* Chọn modem SIM đang dùng.&#x20;
* Thay đổi ERA\_AUTH\_TOKEN thành token của project.&#x20;

<mark style="color:red;">Dùng module Wifi</mark>

<figure><img src="../../.gitbook/assets/image (2) (2) (3).png" alt=""><figcaption></figcaption></figure>

Thay đổi thông số ERA\_AUTH\_TOKEN của project, tên wifi(ssid) và pass wifi(pass).&#x20;

<mark style="color:red;">Lưu ý:</mark>&#x20;

**Đối với board STM32 vui lòng cài đặt thêm thư viện bỗ trợ ở mục 2.2**.&#x20;

<figure><img src="../../.gitbook/assets/image (22) (1).png" alt=""><figcaption></figcaption></figure>

Vào Tools -> Port -> Chọn cổng COM của mạch nạp. <mark style="color:red;">(Bỏ qua bước này nếu dùng STM32)</mark>

<mark style="color:red;"></mark>![](<../../.gitbook/assets/image (18).png>)<mark style="color:red;"></mark>

* Mở serial monitor (hình kính lúp).&#x20;
* Nhấn giữ nút BOOT đồng thời nhấn và nhả nút RST/EN trên board ESP32.&#x20;

<figure><img src="../../.gitbook/assets/image (47).png" alt=""><figcaption></figcaption></figure>

**Tiến hành upload chương trình.**

## 2. Cài đặt thư viện bổ trợ

### 2.1. ESP32

Với ESP32 không cần cài đặt thêm thư viện bổ trợ.

### 2.2. STM32

Yêu cầu cài đặt thêm thư viện STM32duino FreeRTOS by stm32duino, và TinyGSM by vshymanskyy.

<figure><img src="../../.gitbook/assets/image (48).png" alt=""><figcaption><p>STM32duino FreeRTOS trên PlatformIO</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (41) (1).png" alt=""><figcaption><p>TinyGSM trên PlatformIO</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (30).png" alt=""><figcaption><p>STM32duino FreeRTOS trên Arduino IDE</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (11) (2).png" alt=""><figcaption><p>TinyGSM trên Arduino IDE</p></figcaption></figure>

### 2.3. ESP8266

Yêu cầu cài đặt thêm thư viện Preferences by vshymanskyy

<figure><img src="../../.gitbook/assets/image (28).png" alt=""><figcaption><p>Preferences trên PlatfromIO</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (12) (2).png" alt=""><figcaption><p>Preferences trên Arduino IDE</p></figcaption></figure>
