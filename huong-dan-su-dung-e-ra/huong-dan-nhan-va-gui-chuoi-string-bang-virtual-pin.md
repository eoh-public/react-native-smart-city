# Hướng dẫn nhận và gửi chuỗi string bằng Virtual Pin

**Vui lòng cập nhật ERa library lên phiên bản > 1.2.0**

1. **Nhận chuỗi từ ERa:**

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
    if (param.isString()) {
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
    if (param.isString()) {
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

2. **Gửi chuỗi lên ERa**

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

3. **Thư viện bỗ trợ cho Terminal Box Widget**

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
