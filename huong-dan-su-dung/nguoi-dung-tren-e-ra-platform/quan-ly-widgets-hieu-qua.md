# Quản lý Widgets Hiệu quả

## 1.Widget dùng để điều khiển

Các widget này chỉ cần mapping datastreams (config read) để nhận những trạng thái khi action thay đổi và action để gởi lệnh điều khiển.&#x20;

### 1.1. Button

Widget này có thể sử dụng cho tất cả các device bật, tắt với tín hiệu như 0,1. Đây là widget được sử dụng phổ biến nhất cho dạng điều khiển 1 hành động bất kỳ

<figure><img src="../../.gitbook/assets/image (2) (1) (1).png" alt=""><figcaption></figcaption></figure>

### 1.2. 3 Buttons Action

Widget này có thể sử dụng điều khiển 3 action trong cùng 1 widget\
Ví dụ: Device Cổng gate hoặc rèm(đóng, dừng, mở),..&#x20;

<figure><img src="../../.gitbook/assets/image (36).png" alt=""><figcaption></figcaption></figure>

### 1.3. State Grid

Widget này có thể sử dụng điều khiển nhiều action trong cùng 1 widget\
Ví dụ: Bật tắt nhiều đèn, điều khiển các chế độ khác nhau của máy lạnh,...

<figure><img src="../../.gitbook/assets/image (2) (1).png" alt=""><figcaption></figcaption></figure>

### 1.4. Number Action

Widget này có thể sử dụng điều khiển nhiều action nhanh giá trị lên xuống\
Ví dụ: điều khiển nhiệt độ máy lạnh, điều khiển đèn (truyền nhanh trạng thái 0,1),...

<figure><img src="../../.gitbook/assets/image (1) (6).png" alt=""><figcaption></figcaption></figure>

### 1.5. Slide Range

Widget này có thể sử dụng điều khiển tăng giảm giá trị \
Ví dụ: điều khiển độ sáng của đèn dimming

<figure><img src="../../.gitbook/assets/image (5) (4).png" alt=""><figcaption></figcaption></figure>

### 1.6. Options Dropdown Action

Widget này có thể sử dụng điều khiển với 1 action thì điều khiển những trạng thái gì\
Ví dụ: Khi action : On của Quạt, thì tốc độ quay sẽ 1,2,3,4,...

<figure><img src="../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

## 2. Widget dùng để hiện giá trị.&#x20;

Các widget này chỉ cần mapping datastreams (config read) để đọc giá trị lên trên widget bao gồm

### 2.1. Value Box

Widget này có thể sử dụng hiển thị giá trị đọc được từ config của device. 1 widget có thể hiển thị được nhiều bảng giá trị cùng 1 lúc\
Ví dụ: Nhiệt độ, độ ẩm, chất lượng không khí,...

<figure><img src="../../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>

### 2.2. Line Chart

Widget này dùng để hiển thị lịch sử của dãy giá trị đã truyền lên của config theo thời gian, từ đó xem được biến động của dữ liệu\
Ví dụ: Lịch sử nhiệt độ, độ ẩm, thời điểm bật/tắt đèn,...

<figure><img src="../../.gitbook/assets/image (7) (4).png" alt=""><figcaption></figcaption></figure>

### 2.3. Gauge

Widget này có thể sử dụng hiển thị giá trị đọc được từ config của device 1 các trực quan về biến động gần tới ngưỡng max để chú ý\
Ví dụ: giám sát công xuất, pH,...

<figure><img src="../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

### 2.4. Circle

Widget này có thể sử dụng hiển thị rõ được những ngưỡng cảnh báo, trang thái một cách sinh động  mà không cần phải đoán với giá trị hiện lên báo hiện 1 sự kiện như thế nào\
Ví dụ: Chất lượng nước, chất lượng không khí (tốt, trung bình, thấp,...), hoặc trạng thái cửa mở/đóng,...&#x20;

<figure><img src="../../.gitbook/assets/image (24) (2).png" alt=""><figcaption></figcaption></figure>

### 2.5. Compass

Widget chuyên cho hiển thị dạng hướng gió và tốc độ gió cho cảm biến thời tiết

<figure><img src="../../.gitbook/assets/image (4) (5).png" alt=""><figcaption></figcaption></figure>

## 3. View Video

Widget này có thể hiển thị các video đã được quy đổi "http://demo.mp4" để chiếu trên widget của mình. Chỉ cần coppy URL đã được quy đổi vào widget\
ví dụ: [https://gist.github.com/jsturgis/3b19447b304616f18657](https://gist.github.com/jsturgis/3b19447b304616f18657)

<figure><img src="../../.gitbook/assets/image (13) (3).png" alt=""><figcaption></figcaption></figure>
