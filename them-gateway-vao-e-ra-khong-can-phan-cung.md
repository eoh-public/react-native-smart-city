---
description: HƯỚNG DẪN ERA TRÊN WOKWI
---

# Thêm gateway vào E-ra không cần phần cứng

## 1. Hướng dẫn&#x20;

* Tạo tài khoản và đăng nhập vào [Wokwi](https://wokwi.com/).&#x20;

<figure><img src=".gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

* Từ trang chủ Wokwi -> Click vào avatar và chọn My project.

<figure><img src=".gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

* Click vào New project -> chọn ESP32.

<figure><img src=".gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

* Click vào Library Manager -> “+” -> Search Era -> Chọn Era để add thử viện vào project.

<figure><img src=".gitbook/assets/image (1) (7).png" alt=""><figcaption></figcaption></figure>

* Vào app dashboard tạo gateway (board ESP32) với Wifi SSID: <mark style="color:red;">Wokwi-GUEST</mark> và Wifi Password <mark style="color:red;">để trống</mark>.

<figure><img src=".gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

* Copy nội dung code “Add gateway” và paste vào file sketch.ino trong project Wokwi -> Nhấn Save để lưu project.
* <img src=".gitbook/assets/image (3) (2).png" alt="" data-size="line">Nhấn vào để chạy chương trình \
  <mark style="color:red;">Lưu ý:</mark> \ <mark style="color:red;">Trong quá trình trải nghiệm không ẩn tab wokwi mà phải thu nhỏ để 1 góc màn hình. Nếu đóng gateway ảo vừa tạo sẽ bị mất kết nối và không trải nghiệm tiếp được</mark>

<figure><img src=".gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

* Kết nối thành công gateway
* Thêm linh kiện để test tại icon "+" .  Cách đối nối thiết bị ngoại vi cho board ESP32 này tương tự như cách đấu nối dây thực tế&#x20;

{% content-ref url="developer-mode/huong-dan-dau-noi-thiet-bi-ngoai-vi.md" %}
[huong-dan-dau-noi-thiet-bi-ngoai-vi.md](developer-mode/huong-dan-dau-noi-thiet-bi-ngoai-vi.md)
{% endcontent-ref %}

<figure><img src=".gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

Ví dụ đấu nối thành công cho 1 giải pháp mẫu [https://wokwi.com/projects/349830329640419924](https://wokwi.com/projects/349830329640419924)

* Thêm kinh kiện đã đấu nối vào phần mềm vị trí input/ouput pins

{% content-ref url="developer-mode/quan-ly-va-cau-hinh-gateway.md" %}
[quan-ly-va-cau-hinh-gateway.md](developer-mode/quan-ly-va-cau-hinh-gateway.md)
{% endcontent-ref %}

* Hiển thị Widget để trải nghiệm với chân pin vừa tạo để điều khiển

{% content-ref url="developer-mode/quan-ly-unit.md" %}
[quan-ly-unit.md](developer-mode/quan-ly-unit.md)
{% endcontent-ref %}
