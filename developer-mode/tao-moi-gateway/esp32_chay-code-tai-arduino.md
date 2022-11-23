---
description: >-
  Để bắt đầu một Project IoT với thiết bị hoàn toàn mới được phát triển bởi các
  cá nhân và tổ chức nhà phát triển, người dùng sẽ phải Active lên gateway làm
  cổng kết nối với các thiết bị khác nhau.
---

# ESP32\_Chạy code tại Arduino

**Bước add bằng Arduino** \
Trong Popup Preference, tìm đến “Additional Boards Manager URLs” thêm đường dẫn sau và nhấn OK. \
****https://dl.espressif.com/dl/package\_esp32\_index.json\
\
Sau khi hoàn thành các bước trong file hướng dẫn. Tới bước nạp code vào phần mềm, làm theo hướng dẫn dưới đây.

**Chuẩn bị:**  Tạo mới Unit để chứa thông tin hiển thị của gateway bạn muốn trải nghiệm

![](<../../.gitbook/assets/image (2).png>)

Thêm mới 1 gateway vào hệ thống tại menu "All gateway"

**Bước 1 : Hardware**\
&#x20;Nhập thông tin cơ bản của gateway nạp vào hệ thống và Unit hiển thị

<figure><img src="../../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

**Bước 2: Install Library**\
Cài đặt thư viện để nạp code board vào bằng " Arduino" hoặc "PlatformIO" theo hướng dẫn chi tiết dưới đây

{% content-ref url="../../developer-mode_user-guide/chuan-bi-firmware/esp32-stm32.md" %}
[esp32-stm32.md](../../developer-mode\_user-guide/chuan-bi-firmware/esp32-stm32.md)
{% endcontent-ref %}

<figure><img src="../../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

**Bước 3: Code**\
\-  Nhập thông tin wiffi tại vị trí bạn đang add gateway và Sao chép code ở bên phải  " Arduino" hoặc "PlatformIO" . Ấn vào nút check để hệ thống nhận diện được token mới\
![](<../../.gitbook/assets/image (8) (1).png>)     ![](<../../.gitbook/assets/image (3) (2).png>)\
\
\- Sau khi hiện done compilling thì tiến hành ấn nút " -->" bên cạnh nút check để tiến hành nạp code, đồng thời trên thiết bị ESP32 ấn nút boot liên tục đến khi hệ thống nhận và chạy % đầu tiền thì thả ra\
![](<../../.gitbook/assets/image (7) (1) (1).png>)      <img src="../../.gitbook/assets/image (8) (1) (1).png" alt="" data-size="original"> -&#x20;

<figure><img src="../../.gitbook/assets/image (6) (1) (1).png" alt=""><figcaption></figcaption></figure>

_Lưu ý: Tiến hành cài đặt đầy đủ Driver cho ESP32 trước khi tiến hành nạp code._ [_https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads_](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads) _bạn có thể vào đây để tải lại driver nếu máy chưa tìm thấy được cổng COM._

**Bước 4: Gateway Activation**\
Khi hệ thống chạy xong 100% và hiện chữ "leaving..." và trên web hiện đoạn code đã nạp thành công --> Ấn Go to gateway để hoàn thành tạo mới\
**Thời gian chờ kết nối từ 30s-60s**\
![](<../../.gitbook/assets/image (2) (2) (2).png>)     ![](<../../.gitbook/assets/image (11) (1).png>)

*   Gateway mới tạo có trên ứng dụng và có thể trải nghiệm giải pháp IOT của E-Ra. Gateway mới tạo sẽ hiện online\
    &#x20;

    <figure><img src="../../.gitbook/assets/image (9) (1) (1).png" alt=""><figcaption></figcaption></figure>