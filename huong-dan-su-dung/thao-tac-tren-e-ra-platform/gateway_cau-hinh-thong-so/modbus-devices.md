# Modbus devices

Ấn vào setup để tiến hành tạo mới device bằng phương pháp modbus

<figure><img src="../../../.gitbook/assets/image (8) (2).png" alt=""><figcaption></figcaption></figure>

Tạo mới device trong gateway. Tại đây người dùng nhập các thông tin cơ bản của modbus

<figure><img src="../../../.gitbook/assets/image (9) (2).png" alt=""><figcaption></figcaption></figure>

* Conection time: Device sẽ báo trạng thái "OFFLINE" khi thời gian giữ 2 lần nhận tín hiệu xa hơn thời gian setup (giây)
* Address: Địa chỉ của device modbus. Mỗi model sẽ có 1 địa chỉ mật định được cung cấp trong bộ thông số kỹ thuật
* Delay: Thông tin được cung cấp trong bộ thông số kỹ thuật
* Index: Sắp xếp thứ tự hiển thị

Sau khi hoàn thành thêm mới device, người dùng sẽ tiến hành thêm mới các config hoặc action của device đó

**-Ví dụ: Mapping 1 device là bộ điều khiển với địa chỉ là 17**

<figure><img src="../../../.gitbook/assets/image (5) (1).png" alt=""><figcaption></figcaption></figure>

* Config read: Là các device có chức năng đọc được giữ liệu và hiển thị trên widget\
  Ví dụ Giá trị nhiệt độ, độ ẩm,...\
  Dưới đây là hình mình họa của đọc trạng thái của bộ điều khiển

<figure><img src="../../../.gitbook/assets/image (11) (1).png" alt=""><figcaption></figcaption></figure>

* Config write: Là các device có chức năng ghi được giữ liệu và liên kết với action để điều khiển thiết bị\
  Ví dụ: Với thiết bị của bộ điều khiển

<figure><img src="../../../.gitbook/assets/image (41).png" alt=""><figcaption></figcaption></figure>

* Action: Nhập các action của device đó

<figure><img src="../../../.gitbook/assets/image (1) (5).png" alt=""><figcaption></figcaption></figure>

Ví dụ: Với thiết bị của bộ điều khiển

<figure><img src="../../../.gitbook/assets/image (4) (3) (2).png" alt=""><figcaption></figcaption></figure>

