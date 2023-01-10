# STM32-Wifi\_Arduino

**Chuẩn bị:**  Tạo mới Unit để chứa thông tin hiển thị của gateway bạn muốn trải nghiệm

![](<../../../.gitbook/assets/image (2) (2).png>)

Thêm mới 1 gateway vào hệ thống tại menu "All gateway"

**Bước 1 : Hardware**\
&#x20;Nhập thông tin cơ bản của gateway nạp vào hệ thống. Chọn board STM32-Wifi

<figure><img src="../../../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

**Bước 2: Install Library**

{% content-ref url="../../../developer-mode_user-guide/chuan-bi-firmware.md" %}
[chuan-bi-firmware.md](../../../developer-mode\_user-guide/chuan-bi-firmware.md)
{% endcontent-ref %}

Sau khi đã chuẩn bị firmware đầy đủ thì chọn hình thức " Arduino"  --> Ấn Next step để tiếp tục\


<figure><img src="../../../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

**Bước 3: Code - Cập nhật token mới**\
\-  **\[Trên giao diện E-ra]** Nhập thông tin wifi tại vị trí bạn đang add gateway và Sao chép code ở bên phải  " Arduino".

<figure><img src="../../../.gitbook/assets/image (1) (8).png" alt=""><figcaption></figcaption></figure>

**\[Trên giao diện Ardunio]** nhấn phím tắt Ctrl A đoạn và paste đoạn code vừa copy vào thay thế.

<figure><img src="../../../.gitbook/assets/image (2) (6).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../.gitbook/assets/image (10) (3).png" alt=""><figcaption></figcaption></figure>

\=> Kiểm tra lại các thông tin

* Thay đổi ERA\_AUTH\_TOKEN thành token của project
* Tên wifi(ssid) và pass wifi(pass)

\- Ấn nút Check để hệ thống kiểm tra và ghi nhận token mới

\- Sau khi hiện done compilling thì tiến hành ấn nút " -->" bên cạnh nút check để tiến hành nạp code, đồng thời trên thiết bị ESP32 ấn nút boot và giữ tay đến khi hệ thống nhận và chạy % đầu tiền thì thả ra\
![](<../../../.gitbook/assets/image (7) (1) (1).png>)      <img src="../../../.gitbook/assets/image (8) (1) (1).png" alt="" data-size="original"> -&#x20;

<figure><img src="../../../.gitbook/assets/image (6) (1) (1).png" alt=""><figcaption></figcaption></figure>

_<mark style="color:red;">Lưu ý:</mark> Tiến hành cài đặt đầy đủ Driver cho STM32 trước khi tiến hành nạp code hoặc bạn có thể_ cài [ST-link](https://www.st.com/en/development-tools/stsw-link009.html) _để tải lại driver nếu máy chưa tìm thấy được cổng COM._

**Bước 4: Gateway Activation**\
Khi hệ thống chạy xong 100% và hiện chữ "leaving..." và trên web hiện đoạn code đã nạp thành công --> Ấn Go to gateway để hoàn thành tạo mới\
**Thời gian chờ kết nối từ 30s-60s**\
![](<../../../.gitbook/assets/image (2) (2) (2).png>)     ![](<../../../.gitbook/assets/image (11) (1).png>)

*   Gateway mới tạo có trên ứng dụng và có thể trải nghiệm giải pháp IOT của E-Ra. Gateway mới tạo sẽ hiện online\
    &#x20;

    <figure><img src="../../../.gitbook/assets/image (9) (1) (1).png" alt=""><figcaption></figcaption></figure>

    Xem video hướng dẫn cụ thể tại đây&#x20;

{% content-ref url="../../video-demo-trai-nghiem-e-ra.md" %}
[video-demo-trai-nghiem-e-ra.md](../../video-demo-trai-nghiem-e-ra.md)
{% endcontent-ref %}
