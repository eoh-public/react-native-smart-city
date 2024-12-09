---
description: >-
  Vui lòng cập nhật E-Ra App (iOS/Android) lên phiên bản V3.0.4 hoặc mới hơn để
  sử dụng tính năng này nhé!
---

# Hướng dẫn nhận và gửi chuỗi string bằng Virtual Pin

{% embed url="https://youtu.be/htTE9G2ixgQ" %}
Video Hướng dẫn nhận và gửi chuỗi String qua Nền tảng IoT E-Ra bằng Virtual Pin
{% endembed %}

## I. Hướng dẫn Lập trình (Firmware)

**Vui lòng cập nhật ERa library lên phiên bản > 1.2.0**

### **I.1. Nhận chuỗi từ ERa**

Để lấy chuỗi từ **ERa** gửi xuống cần dùng hàm sau:

```arduino
param.getString();
```

Bên trong hàm callback:

```arduino
ERA_WRITE(vPin) {
}
```

**Lưu ý:**

Hàm _**param.getString()**_ trả về kiểu dữ liệu **C**_**-style strings (const char\*)**_

_**Ví dụ (Nhận chuỗi bằng V0):**_

```arduino
ERA_WRITE(V0) {
    // Kiểm tra có phải chuỗi hay không
    if (!param.isString()) {
        return;
    }

    // 1. Lấy chuỗi C-style strings
    const char* cstr = param.getString();
    // 2. Lấy chuỗi bằng ERaString
    ERaString estr = param.getString();
    // 3. Lấy chuỗi bằng Arduino String
    String astr = param.getString();
    // 4. Lấy chuỗi bằng std string
    string sstr = param.getString();

    // Dùng 1 trong 4 cách trên để lấy dữ liệu chuỗi
    // Xử lý chuỗi (ví dụ với cách 2)
    if (estr == "on") {
        // Bật LED tại GPIO 2
        digitalWrite(2, HIGH);
    }
    else if (estr == "off") {
        // Tắt LED tại GPIO 2
        digitalWrite(2, LOW);
    }
}
```

Ngoài ra nếu chuỗi là dạng **JSON**, có thể dùng hàm sau để parse dữ liệu:

```arduino
// Hàm này sẽ trả về kiểu dữ liệu ERaJson
param.toJSON();
```

**Ví dụ (Khi nhận chuỗi là dạng JSON):**

```arduino
ERA_WRITE(V0) {
    // Kiểm tra có phải chuỗi hay không
    if (!param.isString()) {
        return;
    }

    // Parse chuỗi sang JSON
    ERaJson ejs = param.toJSON();
    // Kiểm tra có phải JSON hay không
    if (ejs == nullptr) {
        return;
    }

    // {"x":0, "y":0, "msg":"Hi, I'm ERa"}
    // Ví dụ dùng chuỗi JSON trên để in message lên LCD 16x2
    // Lấy giá trị từ key "x" JSON
    int x = ejs["x"].getInt();
    // Lấy giá trị từ key "y" JSON
    int y = ejs["y"].getInt();
    // Lấy giá trị từ key "msg" JSON
    const char* msg = ejs["msg"].getString();

    // Xóa LCD
    lcd.clear();
    // Đưa con trỏ LCD đến tọa độ x, y
    lcd.setCursor(x, y);
    // In message lên LCD
    lcd.print(msg);
}
```

### **I.2. Gửi chuỗi lên ERa**

Đồi với kiểu dữ liệu **C-style strings (char\* và const char\*)** và **ERaString** có thể gửi trực tiếp:

**Ví dụ:**

```arduino
// Gửi trực tiếp chuỗi lên ERa
ERa.virtualWrite(V0, "Hi, I'm ERa");

// Gửi chuỗi lên ERa bằng C-style strings (const char*)
const char* value = "Hi, I'm ERa";
ERa.virtualWrite(V0, value);

// Gửi chuỗi lên ERa bằng ERaString
ERaString estr = "Hi, I'm ERa";
ERa.virtualWrite(V0, estr);
```

Đối với kiểu dữ liệu **Arduino String** và **std string** cần chuyển sang **C-style strings** bằng hàm **c\_str()** trước khi gửi lên **ERa**.

**Ví dụ:**

```arduino
// Gửi chuỗi lên ERa bằng Arduino String
String astr = "Hi, I'm ERa";
ERa.virtualWrite(V0, astr.c_str());

// Gửi chuỗi lên ERa bằng std string
string sstr = "Hi, I'm ERa";
ERa.virtualWrite(V0, sstr.c_str());
```

### **I.3. Thư viện bỗ trợ cho Terminal Box Widget**

Thêm thư viện bằng dòng include sau:

```arduino
#include <ERa.hpp>
#include <Widgets/ERaWidgets.hpp>
```

Khai báo **Terminal Box** như sau:

```cpp
// Tạo biến ERaString để lưu chuỗi nhận được khi gửi từ ERa
ERaString estr;
// Tạo terminal box trong đó:
// V1 là from datastream
// V2 là to datastream
ERaWidgetTerminalBox terminal(estr, V1, V2);
```

Tạo hàm callback khi nhận được chuỗi gửi từ **ERa**:

```arduino
// Hàm này sẽ được gọi khi nhận được chuỗi từ ERa gửi xuống
void terminalCallback() {
    // Ví dụ khi từ ERa gửi chuỗi "Hi"
    // Chip sẽ phản hồi lại "Hello! Thank you for using ERa."

    // Kiểm tra nếu nhận được chuỗi "Hi"
    if (estr == "Hi") {
        // Đưa chuỗi "Hello! " vào buffer gửi
        terminal.print("Hello! ");
    }
    // Đưa chuỗi "Thank you for using ERa." vào buffer gửi
    terminal.print("Thank you for using ERa.");
    // Gửi chuỗi trong buffer lên ERa
    terminal.flush();
}
```

Khởi tạo Terminal bằngdòng code sau:

```arduino
// Khởi tạo Terminal box widget với hàm callback: terminalCallback
terminal.begin(terminalCallback); 
// Đặt hàm trên trước dòng
// ERa.begin(ssid, pass);
```

## II. Hướng dẫn Cấu hình trên Web Dashboard

### II.1.       Khởi tạo I/O trên gateway

Bước 1: Chọn vào gateway đã vừa khởi tạo thành công.

Bước 2: Chọn vào tab Input/Output pins.

Bước 3: Chọn vào nút setup để bật chế độ Input/Output Pins trên gateway.

<figure><img src="../.gitbook/assets/image (6) (1).png" alt=""><figcaption></figcaption></figure>

Bước 4: Chọn nút Confirm để xác nhận việc khởi tạo tính năng Input/Output pins.

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

Vậy là quá trình khởi tạo Input/Output pins trên gateway đã thành công tiến đến bước cấu hình config read, write, action để điều khiển thiết bị.

### II.2.       Cấu hình gửi và nhận chuỗi

Tạo Device mới có tên Text Box: All gateways → Chọn gateway → Input/Output pins → New Input/Output pins.

<figure><img src="../.gitbook/assets/image (2) (1) (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (3) (1) (1).png" alt=""><figcaption></figcaption></figure>

Đặt tên Device: Text Box → Create.

Tương tự tạo Device mới có tên Terminal Box.

<figure><img src="../.gitbook/assets/image (4) (1) (1).png" alt=""><figcaption></figcaption></figure>

Nhấn vào Device Text Box vừa được tạo.

Đế cấu hình chân ảo cho Device Text Box: chọn mục Virtual Pin → New Virtual Pin.

<figure><img src="../.gitbook/assets/image (5) (1) (1).png" alt=""><figcaption></figcaption></figure>

Đặt tên cho config: String; Pin: V0; Value type: String → nhấn Done.

<figure><img src="../.gitbook/assets/image (6) (1) (1).png" alt=""><figcaption></figcaption></figure>

Tạo hành động cho Text Box: Chọn mục Action → New Action.

<figure><img src="../.gitbook/assets/image (7) (1).png" alt=""><figcaption></figcaption></figure>

Đặt tên cho Action để gửi chuỗi xuống: Down; Pin: V0; Value: 0 → nhấn Save.

<figure><img src="../.gitbook/assets/image (8) (1).png" alt=""><figcaption></figcaption></figure>

Nhấn vào Device Terminal Box ở bên mục Input/Output pin.

<figure><img src="../.gitbook/assets/image (9) (1).png" alt=""><figcaption></figcaption></figure>

Cấu hình ghi chân ảo cho Device Terminal Box: chọn mục Virtual Pin → New Virtual Pin.

<figure><img src="../.gitbook/assets/image (10) (1).png" alt=""><figcaption></figcaption></figure>

Đặt tên cho config: From String; Pin: V1; Value type: String → nhấn Done.

<figure><img src="../.gitbook/assets/image (11) (1).png" alt=""><figcaption></figcaption></figure>

Tiếp tục tạo config thứ 2: To String; Pin: V2; Value type: String → nhấn Done.

<figure><img src="../.gitbook/assets/image (12) (1).png" alt=""><figcaption></figcaption></figure>

Tạo hành động cho Terminal Box: Chọn mục Action → New Action.

<figure><img src="../.gitbook/assets/image (13) (1).png" alt=""><figcaption></figcaption></figure>

Đặt tên cho Action để gửi chuỗi xuống (của Virtual From String): Down From String; Pin: V1; Value: 0 → nhấn Save.

<figure><img src="../.gitbook/assets/image (14) (1).png" alt=""><figcaption></figcaption></figure>

### II.3.       Cấu hình gửi chuỗi với Text Box

Tạo Widget Text Box: Vào phần Widget box bên trái màn hình chọn Widget Text Box→ Add Widget → Đưa trỏ chuột vào Widget vừa tạo và nhấn vào bánh răng cưa để tiến hành cấu hình.

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

Sau đó sẽ xuất hiện 1 bảng Setting widget để tiến hành cấu hình như sau:

Cấu hình tên, khu vực và device display xem lại ở phần [2.4.8.](https://e-ra-iot-wiki.gitbook.io/documentation/huong-dan-su-dung-e-ra/thao-tac-tren-web-e-ra-platform)

Cấu hình Select datastream.

\-     Gateway: nhấn chuột vào mũi tên chỉ xuống để chọn gateway mà bạn cần sử dụng ở đây là: E-Ra Huong Dan.

<figure><img src="../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>

\- Device: nhấn chuột vào mũi tên chỉ xuống để chọn thiết bị cần sử dụng Text Box.

<figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

\- Datastream: nhấn chuột vào mũi tên chỉ xuống để chọn thành phần String.

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>

Cấu hình Select action.

\-     Gateway: nhấn chuột vào mũi tên chỉ xuống để chọn gateway mà bạn cần sử dụng ở đây là: E-Ra Huong Dan.

<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption></figcaption></figure>

\- Device: nhấn chuột vào mũi tên chỉ xuống để chọn thiết bị cần sử dụng Text Box.

<figure><img src="../.gitbook/assets/image (20).png" alt=""><figcaption></figcaption></figure>

\- Action: nhấn chuột vào mũi tên chỉ xuống để chọn Action Down.

<figure><img src="../.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure>

Sau khi thực hiện cấu hình thành công nhấn OK để lưu lại.

<figure><img src="../.gitbook/assets/image (22).png" alt=""><figcaption></figcaption></figure>

### II.4.       Cấu hình gửi chuỗi với Terminal Box

Tạo Widget Terminal Box: Vào phần Widget box bên trái màn hình chọn Widget Terminal Box → Add Widget → Đưa trỏ chuột vào Widget vừa tạo và nhấn vào “⚙️” để tiến hành cấu hình.

<figure><img src="../.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

Sau đó sẽ xuất hiện 1 bảng Setting widget để tiến hành cấu hình như sau:

Cấu hình tên, khu vực và device display xem lại ở phần [2.4.8](https://e-ra-iot-wiki.gitbook.io/documentation/huong-dan-su-dung-e-ra/thao-tac-tren-web-e-ra-platform)

Cấu hình Select from datastream.

\-     Gateway: nhấn chuột vào mũi tên chỉ xuống để chọn gateway mà bạn cần sử dụng ở đây là: E-Ra Huong Dan.

<figure><img src="../.gitbook/assets/image (24).png" alt=""><figcaption></figcaption></figure>

\- Device: nhấn chuột vào mũi tên chỉ xuống để chọn thiết bị cần sử dụng Terminal Box.

<figure><img src="../.gitbook/assets/image (25).png" alt=""><figcaption></figcaption></figure>

\- Datastream: nhấn chuột vào mũi tên chỉ xuống để chọn thành phần From String.

<figure><img src="../.gitbook/assets/image (26).png" alt=""><figcaption></figcaption></figure>

Cấu hình Select to datastream.

\-     Gateway: nhấn chuột vào mũi tên chỉ xuống để chọn gateway mà bạn cần sử dụng ở đây là: E-Ra Huong Dan.

<figure><img src="../.gitbook/assets/image (27).png" alt=""><figcaption></figcaption></figure>

\- Device: nhấn chuột vào mũi tên chỉ xuống để chọn thiết bị cần sử dụng Terminal Box.

<figure><img src="../.gitbook/assets/image (28).png" alt=""><figcaption></figcaption></figure>

\- Datastream: nhấn chuột vào mũi tên chỉ xuống để chọn thành phần To String.

<figure><img src="../.gitbook/assets/image (29).png" alt=""><figcaption></figcaption></figure>

Cấu hình Select action.

\-     Gateway: nhấn chuột vào mũi tên chỉ xuống để chọn gateway mà bạn cần sử dụng ở đây là: E-Ra Huong Dan.

<figure><img src="../.gitbook/assets/image (30).png" alt=""><figcaption></figcaption></figure>

\- Device: nhấn chuột vào mũi tên chỉ xuống để chọn thiết bị cần sử dụng Terminal Box.

<figure><img src="../.gitbook/assets/image (31).png" alt=""><figcaption></figcaption></figure>

\- Action: nhấn chuột vào mũi tên chỉ xuống để chọn Action Down From String.

<figure><img src="../.gitbook/assets/image (32).png" alt=""><figcaption></figcaption></figure>

Sau khi thực hiện cấu hình thành công nhấn OK đê lưu lại.

<figure><img src="../.gitbook/assets/image (33).png" alt=""><figcaption></figcaption></figure>

Nhấn Done để kết thúc quá trình cấu hình.

<figure><img src="../.gitbook/assets/image (34).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (35).png" alt=""><figcaption></figcaption></figure>
