# PlatformIO

### 1. Cài đặt driver&#x20;

Tiến hành cài đặt thêm những driver sau:&#x20;

Với ESP8266: [CP210x](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)&#x20;

### 2. Visual Studio Code&#x20;

<figure><img src="../../../.gitbook/assets/image (340).png" alt=""><figcaption></figcaption></figure>

Truy cập [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/) và tải bản VS Code tương thích với hệ điều hành.&#x20;

### 3. PlatformIO

<figure><img src="../../../.gitbook/assets/image (298).png" alt=""><figcaption></figcaption></figure>

* Mở VS Code chọn Extensions&#x20;
* Tìm PlatformIO IDE&#x20;
* Tiến hành Install PlatformIO&#x20;

### 4. Tạo project

<figure><img src="../../../.gitbook/assets/image (53).png" alt=""><figcaption></figcaption></figure>

* Trong VS Code chọn PlatformIO&#x20;
* PlatformIO: Quick Access -> PIO Home -> Open&#x20;
* Chọn New Project để tạo project mới -> Xuất hiện popup Project Wizard như hình dưới&#x20;

<figure><img src="../../../.gitbook/assets/image (236).png" alt=""><figcaption></figcaption></figure>

Trong Project Wizard: vui lòng nhập tên Project, chọn Board, Framework, Location lưu project và tiến hành tạo Project

<table><thead><tr><th></th><th></th><th data-hidden></th></tr></thead><tbody><tr><td> </td><td>ESP8266</td><td></td></tr><tr><td>Board </td><td>Espressif ESP8266 Dev Module </td><td></td></tr><tr><td>Framework </td><td>Arduino </td><td></td></tr></tbody></table>

### 5. Thêm thư viện vào Project

<figure><img src="../../../.gitbook/assets/image (164).png" alt=""><figcaption></figcaption></figure>

* Trong PlatformIO Home chọn Libraries&#x20;
* Tìm “Era EoH”&#x20;
* Chọn “ERa by EoH Ltd”&#x20;

<figure><img src="../../../.gitbook/assets/image (341).png" alt=""><figcaption></figcaption></figure>

Bảng Registry hiện ra sau đấy chọn version mới nhất và “Add to Project”

<figure><img src="../../../.gitbook/assets/image (96).png" alt=""><figcaption></figcaption></figure>

Popup “Add project dependency” -> tiến hành chọn project và click “Add”

<figure><img src="../../../.gitbook/assets/image (321).png" alt=""><figcaption></figcaption></figure>

Trong bảng Registry -> Examples -> chọn example tương ứng của từng board -> copy nội dung của example

<figure><img src="../../../.gitbook/assets/image (86).png" alt=""><figcaption></figcaption></figure>

Paste nội dung của example vào file main.cpp

<table data-header-hidden><thead><tr><th></th><th></th><th data-hidden></th></tr></thead><tbody><tr><td> </td><td>ESP8266</td><td></td></tr><tr><td>Example </td><td>Basic </td><td></td></tr></tbody></table>

:white\_check\_mark: **Đối với board ESP8266**

<mark style="color:red;">Dùng module Gsm (SIM)</mark>

<figure><img src="../../../.gitbook/assets/image (131).png" alt=""><figcaption></figcaption></figure>

* Chọn APN nhà mạng đang dùng.&#x20;
* Chọn modem SIM đang dùng.&#x20;
* Thay đổi ERA\_AUTH\_TOKEN thành token của project.&#x20;

<mark style="color:red;">Dùng module WiFi</mark>

<figure><img src="../../../.gitbook/assets/image (111).png" alt=""><figcaption></figcaption></figure>

Thay đổi thông số ERA\_AUTH\_TOKEN của project, tên wifi(ssid) và pass wifi(pass).&#x20;

Nhấn vào dấu :heavy\_check\_mark: dưới thanh taskbar để tiến hành build chương trình.

### 6. Upload code

<figure><img src="../../../.gitbook/assets/image (80).png" alt=""><figcaption></figcaption></figure>

Mở file platformio.ini của project và tiến hành thay đổi upload\_port sang cổng COM (Window OS) hoặc “/dev/ttyUSB” (Unix-Based OS) của mạch nạp.&#x20;

<figure><img src="../../../.gitbook/assets/image (351).png" alt=""><figcaption></figcaption></figure>

* Nhấn vào dấu --> dưới thanh taskbar để tiến hành upload chương trình.&#x20;

<mark style="color:red;">**Lưu ý với board ESP8266**</mark>

Vào chế độ bootloader (chế độ upload code) trước khi tiến hành upload chương trình bằng cách:&#x20;

<figure><img src="../../../.gitbook/assets/image (317).png" alt=""><figcaption></figcaption></figure>

* Mở serial monitor (click vào biểu tượng như hình trên).&#x20;
* Nhấn giữ nút BOOT đồng thời nhấn và nhả nút RST/EN trên board ESP8266

<figure><img src="../../../.gitbook/assets/image (85).png" alt=""><figcaption></figcaption></figure>

**Mở wed để tạo mới gateway ESP8266 vào E-ra**

{% content-ref url="../../thao-tac-tren-web-e-ra-platform/tao-moi-gateway/" %}
[tao-moi-gateway](../../thao-tac-tren-web-e-ra-platform/tao-moi-gateway/)
{% endcontent-ref %}
