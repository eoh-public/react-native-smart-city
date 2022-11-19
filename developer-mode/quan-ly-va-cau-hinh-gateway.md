---
description: >-
  Thiết lập các giá trị của mạch mình tại trang All Gateway, bao gồm cấu hình
  device và các config, action đi kèm.
---

# Quản lý gateway



<figure><img src="../.gitbook/assets/image (37).png" alt=""><figcaption></figcaption></figure>

* Info: Thông tin cơ bản của 1 gateway
* Input/Output pins: Tạo mới device và mapping các chân pin được gắn trên board (STM32, ESP32, Raspberry Pi 3)
* Zigbee devices: Quản lý các device sử dụng phương thức zigbee
* Modbus devices: Quản lý các device sử dụng phương thức modbus
* Datastream:Liệt kê tất cả các config read của thuộc 3 phương pháp trên. Chỉnh sửa giá trị đầu muốn lưu và hiển thị trên widget.

## 1.  Info

<figure><img src="../.gitbook/assets/image (22).png" alt=""><figcaption></figcaption></figure>

* Conection time: Gateway sẽ báo trạng thái "OFFLINE" khi thời gian giữ 2 lần nhận tín hiệu xa hơn thời gian setup (giây)

## 2. Input/Output pins

<figure><img src="../.gitbook/assets/image (10) (4).png" alt=""><figcaption></figcaption></figure>

Tạo mới device trong gateway. Tại đây người dùng mapping chân pin của mình gắn với hoạt động từng config read, config write, action của device đó

* Ditital: tín hiệu được phân tách theo thời gian. Nó sử dụng các số 0 và 1 rời rạc để biểu diễn thông tin\
  ví dụ đèn, nút nhấn,trạng thái cửa..
* Analog:  tín hiệu được truyền liên tục (không ngắt quãng) thay đổi theo thời gian\
  ví dụ nhiệt độ, độ ẩm

**Ví dụ: Mapping 1 device đèn với chân pin là GIPO15**

* Config read: Là các chân pin của device có chức năng đọc được giữ liệu và hiển thị trên widget\
  Ví dụ Giá trị nhiệt độ, độ ẩm,...

<figure><img src="../.gitbook/assets/image (1) (4).png" alt=""><figcaption></figcaption></figure>

* Config write: Là các chân pin của device có chức năng ghi được giữ liệu và liên kết với action để điều khiển thiết bị\
  Ví dụ: Điều khiển đèn

<figure><img src="../.gitbook/assets/image (5) (1) (1).png" alt=""><figcaption></figcaption></figure>

* Action: Nhập các action của device đó \
  ví dụ: Với thiết bị đèn chân pin **GIPO15** ở trên tại config write ghi giữ liệu 0 và 1 tương ứng với action tạo ra ở đây\
  0N: 1\
  OFF: 0&#x20;

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

## 3. Zigbee devices

Tính năng đang phát triển

## 4. Modbus device

Ấn vào setup để tiến hành tạo mới device bằng phương pháp modbus

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

Tạo mới device trong gateway. Tại đây người dùng nhập các thông tin cơ bản của modbus

<figure><img src="../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

* Conection time: Device sẽ báo trạng thái "OFFLINE" khi thời gian giữ 2 lần nhận tín hiệu xa hơn thời gian setup (giây)
* Address: Địa chỉ của device modbus. Mỗi model sẽ có 1 địa chỉ mật định được cung cấp trong bộ thông số kỹ thuật
* Delay: Thông tin được cung cấp trong bộ thông số kỹ thuật
* Index: Sắp xếp thứ tự hiển thị

Sau khi hoàn thành thêm mới device, người dùng sẽ tiến hành thêm mới các config hoặc action của device đó

**-Ví dụ: Mapping 1 device là bộ điều khiển với địa chỉ là 17**

<figure><img src="../.gitbook/assets/image (5) (1).png" alt=""><figcaption></figcaption></figure>

* Config read: Là các device có chức năng đọc được giữ liệu và hiển thị trên widget\
  Ví dụ Giá trị nhiệt độ, độ ẩm,...\
  Dưới đây là hình mình họa của đọc trạng thái của bộ điều khiển

<figure><img src="../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>

* Config write: Là các device có chức năng ghi được giữ liệu và liên kết với action để điều khiển thiết bị\
  Ví dụ: Với thiết bị của bộ điều khiển

<figure><img src="../.gitbook/assets/image (41).png" alt=""><figcaption></figcaption></figure>

* Action: Nhập các action của device đó

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

ví dụ: Với thiết bị của bộ điều khiển

<figure><img src="../.gitbook/assets/image (4) (3).png" alt=""><figcaption></figcaption></figure>

