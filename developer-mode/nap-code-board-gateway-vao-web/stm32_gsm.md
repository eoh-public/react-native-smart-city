# STM32\_GSM



**Chuẩn bị:**  Tạo mới Unit để chứa thông tin hiển thị của gateway bạn muốn trải nghiệm

<figure><img src="../../.gitbook/assets/image (19).png" alt=""><figcaption></figcaption></figure>

**Bước 1:** Thêm mới 1 gateway vào hệ thống tại menu "All gateway" và chọn board STM32

<figure><img src="../../.gitbook/assets/image (1) (2) (1).png" alt=""><figcaption></figcaption></figure>

\
Chú thích các bước&#x20;

*   Hardware: Nhập thông tin cơ bản của gateway nạp vào hệ thống và Dashboard (unit) hiển thị\


    <figure><img src="../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>
* Install Library: Cài đặt thư viện để nạp code board vào bằng " Arduino" hoặc "PlatformIO" theo hướng dẫn chi tiết dưới đây\


<figure><img src="../../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

*   Code:\
    \-  Nhập thông tin wiffi tại vị trí bạn đang add gateway và Sao chép code ở bên phải  " Arduino" hoặc "PlatformIO" . Ấn vào nút check để hệ thống nhận diện được token mới\
    &#x20;  ![](../../.gitbook/assets/image.png)\
    \
    \- Sau khi hiện done compilling thì tiến hành ấn nút " -->" bên cạnh nút check để tiến hành nạp code, đồng thời trên thiết bị ESP32 ấn nút boot liên tục đến khi hệ thống nhận và chạy % đầu tiền thì thả ra\
    ![](<../../.gitbook/assets/image (7) (1) (1).png>)      <img src="../../.gitbook/assets/image (8) (1) (1).png" alt="" data-size="original"> -&#x20;

    <figure><img src="../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

    <figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (6) (1) (1).png" alt=""><figcaption></figcaption></figure>

_Lưu ý: Tiến hành cài đặt đầy đủ Driver cho ESP32 trước khi tiến hành nạp code._ [_https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads_](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads) _bạn có thể vào đây để tải lại driver nếu máy chưa tìm thấy được cổng COM._

*   Gateway Activation\
    Khi hệ thống chạy xong 100% và hiện chữ "leaving..." và trên web hiện đoạn code đã nạp thành công --> Ấn Go to gateway để hoàn thành tạo mới\
    **Thời gian chờ kết nối từ 30s-60s**\
    &#x20;  &#x20;

    <figure><img src="../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>
*   Gateway mới tạo có trên ứng dụng và có thể trải nghiệm giải pháp IOT của EOH. Gateway mới tạo sẽ hiện online\


    <figure><img src="../../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>
