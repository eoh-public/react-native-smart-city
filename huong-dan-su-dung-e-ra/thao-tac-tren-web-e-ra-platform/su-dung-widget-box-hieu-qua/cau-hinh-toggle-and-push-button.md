---
description: New update 07/2024
---

# Cấu hình Toggle & Push Button

### Hướng dẫn cấu hình tính năng Toggle and Push Button:

&#x20;   \- Demo với nút nhấn.

#### 1.1 Hướng dẫn cấu hình tính năng Toggle Button (nút nhấn giữ):

_**B1: Tạo Device**_

\- Tạo Device: Ở trang DEVELOPER của Web E-Ra -> chọn All gateways -> chọn gateway “Hướng dẫn E-Ra” đã tạo trước đó -> menu Input/Output pins -> New Input/Output Pin -> tại ô Device name điền “Led\_ESP32” -> Create.

<figure><img src="../../../.gitbook/assets/image (372).png" alt=""><figcaption></figcaption></figure>

\- Cấu hình Device:

&#x20;  \+ Cấu hình Config write: Click “Led\_ESP32” vừa tạo -> chọn menu Config write -> New Config write -> cấu hình như hình dưới -> Done.

<figure><img src="../../../.gitbook/assets/image (373).png" alt=""><figcaption></figcaption></figure>

&#x20; \+ Cấu hình Action: Tại trang cấu hình Device “Led\_ESP32” -> chọn menu Action ->New Action -> lần lượt tạo các action On và Off với value lần lượt là 1 và 0 (xem hình dưới).

<figure><img src="../../../.gitbook/assets/image (374).png" alt=""><figcaption></figcaption></figure>

_**B2: Cấu hình Dashboard:**_

\- Add Widget: Ở trang DEVELOPER Web E-Ra -> chọn Dashboard Units -> chọn Unit  “Hướng dẫn sử dụng E-Ra” -> Edit Dashboard -> tìm và click chọn widget Button (phía trên cùng bên trái) -> Add Widget.

\- Cấu hình Widget: Đưa con trỏ chuột lên góc phải trên cùng Widget Button cần cấu hình -> chọn biểu tượng bánh răng (setting widget) -> Đặt tên Widget Name, tạo Sub unit, tạo Device display, _selection button type_ chọn _Toggle button_ và cài đặt các Setting value như hình bên dưới -> chọn OK.

<figure><img src="../../../.gitbook/assets/image (375).png" alt=""><figcaption></figcaption></figure>

_**B3: Xem kết quả:**_ Chọn Done bên dưới góc phải và xem kết quả nút Toggle button.

<figure><img src="../../../.gitbook/assets/image (376).png" alt=""><figcaption></figcaption></figure>

#### 1.2 Hướng dẫn cấu hình tính năng Push button (nút nhấn nhả):

_**B1: Tạo Device:**_

\- Tương tự B1 nút nhấn giữ.

_**B2: Cấu hình Dashboard:**_

\- Tương tự B2 nút nhấn giữ nhưng chỗ selection button type chọn Push button (xem hình dưới).

<figure><img src="../../../.gitbook/assets/image (377).png" alt=""><figcaption></figcaption></figure>

_**B3: Xem kết quả:**_ Chọn Done bên dưới góc phải và xem kết quả nút push button.

<figure><img src="../../../.gitbook/assets/image (378).png" alt=""><figcaption></figcaption></figure>
