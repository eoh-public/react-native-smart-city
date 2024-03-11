# Hướng dẫn sử dụng HardwareSerial trên ASUS Tinker Board

1. Khai báo

<pre class="language-cpp"><code class="lang-cpp"><strong>HardwareSerial serial;
</strong></code></pre>

2. Cú pháp

<mark style="color:red;">**serial.begin()**</mark>

**Mô tả:**

Thiết lập tốc độ dữ liệu baudrate cho device ID.

```cpp
serial.begin(devID, devBaudrate);
// vd: serial.begin("/dev/ttyS0", 115200);
```

**Tham số truyền vào:**

* devID - device ID của thiết bị.
* devBaudrate - tốc độ baud của thiết bị.

**Giá trị trả về:**

Không

<mark style="color:red;">**serial.available()**</mark>

**Mô tả:**

Lấy số byte (ký tự) có sẵn để đọc từ serial.

```cpp
serial.available();
```

**Tham số truyền vào:**

Không

**Giá trị trả về:**

* Số lượng byte có sẵn để đọc.

<mark style="color:red;">**serial.read()**</mark>

**Mô tả:**

Đọc dữ liệu (byte) từ serial.

```cpp
serial.read();
```

**Tham số truyền vào:**

Không

**Giá trị trả về:**

* Byte đầu tiên của serial (hoặc -1 nếu không có dữ liệu nào có sẵn). Loại dữ liệu: int.

<mark style="color:red;">**serial.readBytes()**</mark>

**Mô tả:**

Đọc dữ liệu (byte) từ serial.

```cpp
serial.readBytes(buffer, length);
```

**Tham số truyền vào:**

* buffer - bộ đệm để lưu trữ các byte.
* length - số lượng byte cần đọc.

**Giá trị trả về:**

* Số lượng byte được đọcvào bộ đệm. Loại dữ liệu: size\_t.

<mark style="color:red;">**serial.write()**</mark>

**Mô tả:**

Ghi dữ liệu vào serial.

```cpp
serial.write(val);
serial.write(str);
serial.write(buf, len);
```

**Tham số truyền vào:**

* val - byte dữ liệu.
* str - chuỗi dữ liệu string.
* buf - chuỗi dữ liệu byte.
* len - số lượng byte sẽ được gửi từ mảng(chuỗi).

**Giá trị trả về:**

* Sẽ trả về số lượng byte đã được ghi. Loại dữ liệu: size\_t.

<mark style="color:red;">**serial.print()**</mark>

**Mô tả:**

Ghi dữ liệu vào serial dưới dạng văn bản ASCII

```cpp
serial.print(val);
```

**Tham số truyền vào:**

* val -  giá trị muốn in.

**Giá trị trả về:**

* Sẽ trả về số lượng byte đã được ghi. Loại dữ liệu: size\_t.

<mark style="color:red;">**serial.prinln()**</mark>

**Mô tả:**

Ghi dữ liệu vào serial dưới dạng văn bản ASCII và ký tự \r\n.

```cpp
serial.println(val);
```

**Tham số truyền vào:**

* val -  giá trị muốn in.

**Giá trị trả về:**

* Sẽ trả về số lượng byte đã được ghi. Loại dữ liệu: size\_t.
