# Sử dụng VIRTUAL PIN

## 1. Virtual pin là gì

**Virtual pin** hay **pin ảo** là tính năng dùng để giao tiếp dữ liệu giữa **E-Ra App** và **Gateway**, **để người dùng có thể tùy biến xây dựng ứng dụng của mình với E-Ra**.

## 2. Virtual pin là gi:&#x20;

Để sử dụng Virtual pin giao tiếp giữa App và gateway ta dùng 2 hàm sau:&#x20;

<mark style="color:red;">2.1 Để gửi dữ liệu từ gateway lên server:</mark>&#x20;

**ERa.virtualWrite(vPin, value);**&#x20;

Trong đấy:&#x20;

* vPin: tên pin ảo V0, V1...&#x20;
* Value: giá trị muốn gửi lên app.&#x20;

<mark style="color:red;">2.2. Để nhận dữ liệu từ server về gateway:</mark>&#x20;

**ERA\_WRITE(vPin)**&#x20;

Với 2 tham số truyền vào:&#x20;

* pin: số pin&#x20;
* param: dữ liệu là server truyền xuống gateway&#x20;

Lưu ý: hiện tại E-Ra chỉ hỗ trợ dữ liệu dạng số là integer, float, double&#x20;

Để lấy dữ liệu từ server ta dùng như sau:&#x20;

Với kiểu integer: **int value = param.getInt()** hoặc **(int)param**&#x20;

Với kiểu float: **float value = param.getFloat()** hoặc **(float)param** &#x20;

Với kiểu double: **double value = param.getDouble()** hoặc **(double)param** &#x20;

## 3. ERaTimer:&#x20;

**ERaTimer:** là tính năng được sữ dụng để đọc và gửi data từ gateway lên server theo 1 chu kỳ cố định và không làm ảnh hưởng đến hệ thống E-Ra. (Chi tiết cách dùng sẽ nêu ra trong ví dụ).&#x20;

## 4. Ví dụ&#x20;

Dùng pin V0 để nhận lệnh điều khiển đèn led build in trên board ESP32.&#x20;

Dùng pin V1 để gửi thời gian chạy (uptime) của gateway lên server.&#x20;

Dùng pin V2 để gửi nhiệt độ chip ESP32 lên server.&#x20;

_Chi tiết API Virtual pin vui lòng truy cập vào trang wiki_ [_**tại đây**_ ](https://github.com/eoh-jsc/era-lib/wiki/Virtual-Pins)_****_

<mark style="color:red;"></mark>
