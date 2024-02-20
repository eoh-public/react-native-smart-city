# Hướng dẫn nhận và gửi chuỗi string bằng Virtual Pin

1. **Nhận chuỗi từ ERa:**

Để nhận chuỗi từ **ERa** gửi xuống cần dùng hàm sau:

```cpp
param.getString();
```

Bên trong hàm callback:

```cpp
ERA_WRITE(vPin) {
}
```

**Lưu ý:**

Hàm _**param.getString()**_ trả về kiểu dữ liệu _**c-style(const char\*)**_

_**Ví dụ (Nhận chuỗi bằng chân V0):**_

```cpp
ERA_WRITE(V0) {
    // Kiểm tra có phải chuỗi hay không
    if (param.isString()) {
        return;
    }

    // 1. Lấy chuỗi c-style
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

```cpp
param.toJSON();
// Hàm này sẽ trả về kiểu dữ liệu ERaJson
```

**Ví dụ (Khi nhận chuỗi là dạng JSON):**

```cpp
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

Đồi với kiểu dữ liệu **c-style(char\* và const char\*)** và **ERaString** có thể gửi trực tiếp:

**Ví dụ:**

```cpp
// Gửi trực tiếp chuỗi lên ERa
ERa.virtualWrite(V0, "Hi, I'm ERa");

// Gửi chuỗi lên ERa bằng c-style(const char*)
const char* value = "Hi, I'm ERa";
ERa.virtualWrite(V0, value);

// Gửi chuỗi lên ERa bằng ERaString
ERaString estr = "Hi, I'm ERa";
ERa.virtualWrite(V0, estr);
```

Đối với kiểu dữ liệu **Arduino String** và **std string** cần chuyển sang **c-style string** bằng hàm **c\_str()** trước khi gửi lên **ERa**.

**Ví dụ:**

```cpp
// Gửi chuỗi lên ERa bằng Arduino String
String astr = "Hi, I'm ERa";
ERa.virtualWrite(V0, astr.c_str());

// Gửi chuỗi lên ERa bằng std string
string sstr = "Hi, I'm ERa";
ERa.virtualWrite(V0, sstr.c_str());
```

3. **Thư viện bỗ trợ cho Terminal Box Widget**

Thêm thư viện bằng dòng include sau:

````cpp
```arduino
#include <Widgets/ERaWidgets.hpp>
```
````

Khai báo Terminal Box như sau:
