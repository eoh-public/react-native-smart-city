# PlatformIO

### 1. Cài đặt driver&#x20;

Tiến hành cài đặt thêm những driver sau:&#x20;

Với STM32: [ST-link](https://www.st.com/en/development-tools/stsw-link009.html)&#x20;

### 2. Visual Studio Code&#x20;

<figure><img src="../../../.gitbook/assets/image (43).png" alt=""><figcaption></figcaption></figure>

Truy cập [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/) và tải bản VS Code tương thích với hệ điều hành.&#x20;

### 3. PlatformIO

<figure><img src="../../../.gitbook/assets/image (39).png" alt=""><figcaption></figcaption></figure>

* Mở VS Code chọn Extensions&#x20;
* Tìm PlatformIO IDE&#x20;
* Tiến hành Install PlatformIO&#x20;

### 4. Tạo project

<figure><img src="../../../.gitbook/assets/image (9) (1).png" alt=""><figcaption></figcaption></figure>

* Trong VS Code chọn PlatformIO&#x20;
* PlatformIO: Quick Access -> PIO Home -> Open&#x20;
* Chọn New Project để tạo project mới -> Xuất hiện popup Project Wizard như hình dưới&#x20;

<figure><img src="../../../.gitbook/assets/image (31).png" alt=""><figcaption></figcaption></figure>

Trong Project Wizard: vui lòng nhập tên Project, chọn Board, Framework, Location lưu project và tiến hành tạo Project



<table data-header-hidden><thead><tr><th></th><th></th><th data-hidden></th></tr></thead><tbody><tr><td> </td><td>STM32 </td><td>ESP32 </td></tr><tr><td>Board </td><td>Black STM32F407VG </td><td>Espressif ESP32 Dev Module </td></tr><tr><td>Framework </td><td>Arduino </td><td>Arduino </td></tr></tbody></table>

<mark style="color:red;">Lưu ý: Hiện tại bản Pre-Release support ESP32, ESP8266, STM32, Raspberry Pi</mark>

### 5. Thêm thư viện vào Project

<figure><img src="../../../.gitbook/assets/image (26).png" alt=""><figcaption></figcaption></figure>

* Trong PlatformIO Home chọn Libraries&#x20;
* Tìm “Era EoH”&#x20;
* Chọn “ERa by EoH Ltd”&#x20;

<figure><img src="../../../.gitbook/assets/image (38).png" alt=""><figcaption></figcaption></figure>

Bảng Registry hiện ra sau đấy chọn version mới nhất và “Add to Project”

<figure><img src="../../../.gitbook/assets/image (24) (1).png" alt=""><figcaption></figcaption></figure>

Popup “Add project dependency” -> tiến hành chọn project và click “Add”

<figure><img src="../../../.gitbook/assets/image (1) (3).png" alt=""><figcaption></figcaption></figure>

Cài đặt thêm thư viện STM32duino FreeRTOS by stm32duino, và TinyGSM by vshymanskyy.

<figure><img src="../../../.gitbook/assets/image (48).png" alt=""><figcaption><p>STM32duino FreeRTOS trên PlatformIO</p></figcaption></figure>

<figure><img src="../../../.gitbook/assets/image (41) (1).png" alt=""><figcaption><p>TinyGSM trên PlatformIO</p></figcaption></figure>

Trong bảng Registry -> Examples -> chọn example tương ứng của từng board -> copy nội dung của example

<figure><img src="../../../.gitbook/assets/image (46).png" alt=""><figcaption></figcaption></figure>

Paste nội dung của example vào file main.cpp

<table data-header-hidden><thead><tr><th></th><th></th><th data-hidden></th></tr></thead><tbody><tr><td> </td><td>STM32 </td><td>ESP32 </td></tr><tr><td>Example </td><td><p>Gsm (nếu dùng SIM) </p><p>Wifi (nếu dùng Wifi) </p></td><td>Basic </td></tr></tbody></table>

<mark style="color:red;">Dùng module Gsm (SIM)</mark>

<figure><img src="../../../.gitbook/assets/image (42).png" alt=""><figcaption></figcaption></figure>

* Chọn APN nhà mạng đang dùng.&#x20;
* Chọn modem SIM đang dùng.&#x20;
* Thay đổi ERA\_AUTH\_TOKEN thành token của project.&#x20;

<mark style="color:red;">Dùng module WiFi</mark>

<figure><img src="../../../.gitbook/assets/image (50).png" alt=""><figcaption></figcaption></figure>

Thay đổi thông số ERA\_AUTH\_TOKEN của project, tên wifi(ssid) và pass wifi(pass).&#x20;

<mark style="color:red;">**Lưu ý**</mark>

Đối với board STM32 vui lòng cài đặt thêm thư viện bỗ trợ ở mục 2.2.&#x20;

<figure><img src="../../../.gitbook/assets/image (44).png" alt=""><figcaption></figcaption></figure>

Nhấn vào dấu :heavy\_check\_mark: dưới thanh taskbar để tiến hành build chương trình.

#### 1.2.4. Upload code

<figure><img src="../../../.gitbook/assets/image (5) (3).png" alt=""><figcaption></figcaption></figure>

* Nhấn vào dấu --> dưới thanh taskbar để tiến hành upload chương trình. \
  **Mở wed để tạo mới gateway ESP32 vào E-ra**

{% content-ref url="../../thao-tac-tren-e-ra-platform/tao-moi-gateway/" %}
[tao-moi-gateway](../../thao-tac-tren-e-ra-platform/tao-moi-gateway/)
{% endcontent-ref %}
