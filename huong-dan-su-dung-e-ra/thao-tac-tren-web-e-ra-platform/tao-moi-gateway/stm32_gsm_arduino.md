# STM32\_GSM\_Arduino



**Chuẩn bị:**  Tạo mới Unit để chứa thông tin hiển thị của gateway bạn muốn trải nghiệm

Thêm mới 1 gateway vào hệ thống tại menu "All gateway" \
\
**Bước 1: Hardware:** \
Nhập thông tin cơ bản của gateway, chọn board STM32\_GSMnạp vào hệ thống và unit hiển thị

<figure><img src="../../../.gitbook/assets/image (49).png" alt=""><figcaption></figcaption></figure>

**Bước 2: Install Library**

{% content-ref url="../../chuan-bi-firmware/" %}
[chuan-bi-firmware](../../chuan-bi-firmware/)
{% endcontent-ref %}

Sau khi đã chuẩn bị firmware đầy đủ thì chọn hình thức " Arduino"  --> Ấn Next step để tiếp tục\


<figure><img src="../../../.gitbook/assets/image (81).png" alt=""><figcaption></figcaption></figure>

**Bước 3: Code - Cập nhật token mới**\
\-  **\[Trên giao diện E-ra]** chọn Apn và Modem của gateway và Sao chép code ở bên phải  " Arduino" hoặc "PlatformIO" . Ấn vào nút check để hệ thống nhận diện được token mới\
&#x20;  ![](<../../../.gitbook/assets/image (178).png>)        ![](<../../../.gitbook/assets/image (213).png>)\
\
\- Sau khi hiện done compilling thì tiến hành ấn nút " -->" bên cạnh nút check để tiến hành nạp code.

<figure><img src="../../../.gitbook/assets/image (300).png" alt=""><figcaption></figcaption></figure>

_<mark style="color:red;">Lưu ý:</mark> Tiến hành cài đặt đầy đủ Driver cho STM32 trước khi tiến hành nạp code hoặc bạn có thể_ cài [ST-link](https://www.st.com/en/development-tools/stsw-link009.html) _để tải lại driver nếu máy chưa tìm thấy được cổng COM._

**Bước 4: Gateway Activation**\
Khi hệ thống chạy thì nút Go to gateway hiện xanh --> Ấn vào để hoàn thành tạo mới\
**Thời gian chờ kết nối từ 30s-60s**

<figure><img src="../../../.gitbook/assets/image (319).png" alt=""><figcaption></figcaption></figure>

*   Gateway mới tạo có trên ứng dụng và có thể trải nghiệm giải pháp IOT của EOH. Gateway mới tạo sẽ hiện online\


    <figure><img src="../../../.gitbook/assets/image (347).png" alt=""><figcaption></figcaption></figure>
