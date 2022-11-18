---
description: >-
  Thiết lập các giá trị của mạch mình tại trang All Gateway, bao gồm cấu hình
  device và các config, action đi kèm.
---

# Quản lý và cấu hình gateway



<figure><img src="../.gitbook/assets/image (37).png" alt=""><figcaption></figcaption></figure>

* Info: Thông tin cơ bản của 1 gateway
* Input/Output pins: Tạo mới device và mapping các chân pin được gắn trên board (STM32, ESP32, Raspberry Pi 3)
* Zigbee devices: Quản lý các device sử dụng phương thức zigbee
* Modbus devices: Quản lý các device sử dụng phương thức modbus
* Datastream:Liệt kê tất cả các config read của thuộc 3 phương pháp trên. Chỉnh sửa giá trị đầu muốn lưu và hiển thị trên widget.

## 1.  Info

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

1. Ấn để chỉnh sửa gateway
2. Xem thông tin board&#x20;
3. Gateway sẽ báo trạng thái "OFFLINE" khi thời gian giữ 2 lần nhận tín hiệu xa hơn thời gian setup (giây)
4. Lựa chọn phương pháp sử dụng để device vào trong gateway hoặc remove phương pháp.&#x20;

## 2. Input/Output pins

<figure><img src="../.gitbook/assets/image (10) (4).png" alt=""><figcaption></figcaption></figure>

Tạo mới device trong gateway. Tại đây người dùng mapping chân pin của mình gắn với hoạt động từng config read, config write, action của device đó

* Ditital: tín hiệu được phân tách theo thời gian. Nó sử dụng các số 0 và 1 rời rạc để biểu diễn thông tin\
  ví dụ đèn, nút nhấn,trạng thái cửa..
* Analog:  tín hiệu được truyền liên tục (không ngắt quãng) thay đổi theo thời gian\
  ví dụ nhiệt độ, độ ẩm

**Ví dụ mapping 1 chân pin đèn GIPO15**

* Config read: Là các chân pin của device có chức năng đọc được giữ liệu và hiển thị trên widget\
  Ví dụ Giá trị nhiệt độ, độ ẩm,...

<figure><img src="../.gitbook/assets/image (1) (4).png" alt=""><figcaption></figcaption></figure>

* Config write: Là các chân pin của device có chức năng ghi được giữ liệu và liên kết với action để điều khiển thiết bị\
  Ví dụ: Điều khiển đèn

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

* Action: Nhập các hoạt động điều khiển

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

## 3. Zigbee devices

Tính năng đang phát triển

## 4. Modbus device



