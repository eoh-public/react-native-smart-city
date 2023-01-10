# Input/Output pins

<figure><img src="../../../.gitbook/assets/image (10) (4) (1).png" alt=""><figcaption></figcaption></figure>

Tạo mới device trong gateway. Tại đây người dùng mapping chân pin của mình gắn với hoạt động từng config read, config write, action của device đó

* Ditital: tín hiệu được phân tách theo thời gian. Nó sử dụng các số 0 và 1 rời rạc để biểu diễn thông tin\
  Ví dụ: đèn, nút nhấn,trạng thái cửa..
* Analog: tín hiệu được truyền liên tục (không ngắt quãng) thay đổi theo thời gian\
  Ví dụ: nhiệt độ, độ ẩm

**Ví dụ: Mapping 1 device đèn với chân pin là GIPO15**

* Config read: Là các chân pin của device có chức năng đọc được giữ liệu và hiển thị trên widget\
  Ví dụ: Giá trị nhiệt độ, độ ẩm,...

<figure><img src="../../../.gitbook/assets/image (1) (4).png" alt=""><figcaption></figcaption></figure>

* Config write: Là các chân pin của device có chức năng ghi được giữ liệu và liên kết với action để điều khiển thiết bị\
  Ví dụ: Điều khiển đèn

<figure><img src="../../../.gitbook/assets/image (5) (1) (1).png" alt=""><figcaption></figcaption></figure>

* Action: Nhập các action của device đó \
  ví dụ: Với thiết bị đèn chân pin **GIPO15** ở trên tại config write ghi giữ liệu 0 và 1 tương ứng với action tạo ra ở đây\
  0N: 1\
  OFF: 0&#x20;

<figure><img src="../../../.gitbook/assets/image (7) (1) (2).png" alt=""><figcaption></figcaption></figure>
