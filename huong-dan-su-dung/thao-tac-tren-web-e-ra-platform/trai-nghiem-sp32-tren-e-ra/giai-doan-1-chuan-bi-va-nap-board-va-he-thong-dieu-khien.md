# Giai đoạn 1: Chuẩn bị và nạp Board và hệ thống điều khiển

_**Bước 1:**_ Vào màn hình <mark style="color:green;">**Nhà Phát Triển**</mark>

_**Bước 2:**_ Vào **Tất cả địa điểm**, chọn Địa điểm điều khiển thiết bị từ danh sách có sẵn&#x20;

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 14.12.41.png" alt=""><figcaption></figcaption></figure>

Nếu chưa có địa điểm phù hợp Click vào nút **Tạo địa điểm** và nhập các thông tin về địa điểm cần tạo

<div>

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 14.16.21.png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 14.19.01.png" alt=""><figcaption></figcaption></figure>

</div>

_**Bước 3:**_ Cấu hình Hardware

Vào **Tất cả Gateways**, chọn Gateway kết nối với thiết bị từ danh sách có sẵn hoặc tạo mới Gateway khi click vào nút **Tạo Gateway mới**

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 14.48.20.png" alt=""><figcaption></figcaption></figure>

Nhập các thông tin cần có cho Gateway, rồi bấm vào nút **Bước kế tiếp**

* Tên Gateway
* Chọn loại bo mạch hỗ trợ, ở đây người dùng sẽ chọn SP32
* Chọn địa điểm đã tạo hoặc tạo điạ điểm phù hợp

<div>

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 15.07.04 (1).png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 14.53.02.png" alt=""><figcaption></figcaption></figure>

</div>

_**Bước 4:**_ Tại phần cài đặt Thư Viện, E-ra platform hiện đang hỗ trợ người dùng sử dụng cả 2 loại thư viện **Arduino** và **PlatformIO**, xem chi tiết hướng dẫn cài đăt và thiết lập [tại đây](https://era-open-iot-platform.gitbook.io/documentation/huong-dan-su-dung/chuan-bi-firmware/esp32-stm32-esp-8266)

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 15.19.42.png" alt=""><figcaption></figcaption></figure>

Sau khi cài đặt thư viện hỗ trợ, bấm vào **Bước kế tiếp**

_**Bước 5:**_ Nạp mã nguồn từ Board vào thiết bị điều khiển

* Nhập tên wifi và password cho wifi nơi đặt thiết bị&#x20;

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 15.48.39.png" alt=""><figcaption></figcaption></figure>

* Copy mã nguồn bên phải và dán vào phần mềm thư viện hỗ trợ của Arduino IDE ([Xem chi tiết](https://era-open-iot-platform.gitbook.io/documentation/huong-dan-su-dung/chuan-bi-firmware/esp32-stm32-esp-8266))

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 15.57.09.png" alt=""><figcaption></figcaption></figure>

* Khi đã hoàn thành bước cài đặt mã nguồn, chọn **Bước kế tiếp**&#x20;

_**Bước 6:**_ Kích hoạt Gateway, khi Board đã được nạp mã nguồn thành công, hệ thống sẽ tự động kết nối, người dùng có thể đi tiếp bằng nút **Đi đến gateway**.

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 16.24.09.png" alt=""><figcaption></figcaption></figure>

_Lúc này Gateway mới đã tạo thành công, hệ thống chuyển giao diện người dùng đến bước cấu hình dữ liệu cho thiết bị_

<figure><img src="../../../.gitbook/assets/Screen Shot 2022-12-29 at 16.33.16.png" alt=""><figcaption></figcaption></figure>
