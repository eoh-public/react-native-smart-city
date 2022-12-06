# STM32\_GSM



**Chuẩn bị:**  Tạo mới Unit để chứa thông tin hiển thị của gateway bạn muốn trải nghiệm

Thêm mới 1 gateway vào hệ thống tại menu "All gateway" và chọn board STM32\
\
**Bước 1: Hardware:** \
Nhập thông tin cơ bản của gateway nạp vào hệ thống và Dashboard (unit) hiển thị\


*

    <figure><img src="../../.gitbook/assets/image (1) (2) (3).png" alt=""><figcaption></figcaption></figure>

**Bước 2: Install Library**\
&#x20;Cài đặt thư viện để nạp code board vào bằng " Arduino" hoặc "PlatformIO" theo hướng dẫn chi tiết dưới đây

{% content-ref url="../../developer-mode_user-guide/chuan-bi-firmware/esp32-stm32.md" %}
[esp32-stm32.md](../../developer-mode\_user-guide/chuan-bi-firmware/esp32-stm32.md)
{% endcontent-ref %}

<figure><img src="../../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

**Bước 3:** **Code**\
\-  chọn Apn và Modem của gateway và Sao chép code ở bên phải  " Arduino" hoặc "PlatformIO" . Ấn vào nút check để hệ thống nhận diện được token mới\
&#x20;  ![](<../../.gitbook/assets/image (9).png>)        ![](<../../.gitbook/assets/image (3) (1).png>)\
\
\- Sau khi hiện done compilling thì tiến hành ấn nút " -->" bên cạnh nút check để tiến hành nạp code.\


<figure><img src="../../.gitbook/assets/image (24).png" alt=""><figcaption></figcaption></figure>

**Bước 4: Gateway Activation**\
Khi hệ thống chạy thì nútGo to gateway hiệ xanh --> Ấn vào để hoàn thành tạo mới\
**Thời gian chờ kết nối từ 30s-60s**\
&#x20;  &#x20;

<figure><img src="../../.gitbook/assets/image (1) (2).png" alt=""><figcaption></figcaption></figure>

*   Gateway mới tạo có trên ứng dụng và có thể trải nghiệm giải pháp IOT của EOH. Gateway mới tạo sẽ hiện online\


    <figure><img src="../../.gitbook/assets/image (10) (6).png" alt=""><figcaption></figcaption></figure>
