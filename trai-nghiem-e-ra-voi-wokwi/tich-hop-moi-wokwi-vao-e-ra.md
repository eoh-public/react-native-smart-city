---
description: Người dùng tự tích hợp từ bước cơ bản tới khi gateway nạp code thành công
---

# Tích hợp mới wokwi vào E-Ra

## 1. Hướng dẫn&#x20;

* Tạo tài khoản và đăng nhập vào [Wokwi](https://wokwi.com/).&#x20;

<figure><img src="../.gitbook/assets/image (211).png" alt=""><figcaption></figcaption></figure>

* Từ trang chủ Wokwi -> Click vào avatar và chọn My project.

<figure><img src="../.gitbook/assets/image (90).png" alt=""><figcaption></figcaption></figure>

* Click vào New project -> chọn ESP32.

<figure><img src="../.gitbook/assets/image (87).png" alt=""><figcaption></figcaption></figure>

* Click vào Library Manager -> “+” -> Search Era -> Chọn Era để add thử viện vào project.

<figure><img src="../.gitbook/assets/image (119).png" alt=""><figcaption></figcaption></figure>

* Vào app dashboard tạo gateway (board ESP32) với Wifi SSID: <mark style="color:red;">Wokwi-GUEST</mark> và Wifi Password <mark style="color:red;">để trống</mark>.

<figure><img src="../.gitbook/assets/image (234).png" alt=""><figcaption></figcaption></figure>

* Copy nội dung code “Add gateway” và paste vào file sketch.ino trong project Wokwi -> Nhấn Save để lưu project.
* <img src="../.gitbook/assets/image (106).png" alt="" data-size="line">Nhấn vào để chạy chương trình \
  <mark style="color:red;">Lưu ý:</mark> \ <mark style="color:red;">Trong quá trình trải nghiệm không ẩn tab wokwi mà phải thu nhỏ để 1 góc màn hình. Nếu đóng gateway ảo vừa tạo sẽ bị mất kết nối và không trải nghiệm tiếp được</mark>

<figure><img src="../.gitbook/assets/image (102).png" alt=""><figcaption></figcaption></figure>

* Kết nối thành công gateway
* Thêm linh kiện để test tại icon "+" .  Cách đối nối thiết bị ngoại vi cho board ESP32 này tương tự như cách đấu nối dây thực tế&#x20;

{% content-ref url="../huong-dan-su-dung-e-ra/huong-dan-dau-noi-thiet-bi-ngoai-vi.md" %}
[huong-dan-dau-noi-thiet-bi-ngoai-vi.md](../huong-dan-su-dung-e-ra/huong-dan-dau-noi-thiet-bi-ngoai-vi.md)
{% endcontent-ref %}

<figure><img src="../.gitbook/assets/image (294).png" alt=""><figcaption></figcaption></figure>

Ví dụ đấu nối thành công cho 1 giải pháp mẫu [https://wokwi.com/projects/349830329640419924](https://wokwi.com/projects/349830329640419924)

* Thêm kinh kiện đã đấu nối vào phần mềm vị trí input/ouput pins

{% content-ref url="../huong-dan-su-dung-e-ra/thao-tac-tren-web-e-ra-platform/gateway_cau-hinh-thong-so/" %}
[gateway\_cau-hinh-thong-so](../huong-dan-su-dung-e-ra/thao-tac-tren-web-e-ra-platform/gateway\_cau-hinh-thong-so/)
{% endcontent-ref %}

* Hiển thị Widget để trải nghiệm với chân pin vừa tạo để điều khiển

{% content-ref url="../huong-dan-su-dung-e-ra/thao-tac-tren-web-e-ra-platform/dashboard-unit.md" %}
[dashboard-unit.md](../huong-dan-su-dung-e-ra/thao-tac-tren-web-e-ra-platform/dashboard-unit.md)
{% endcontent-ref %}
