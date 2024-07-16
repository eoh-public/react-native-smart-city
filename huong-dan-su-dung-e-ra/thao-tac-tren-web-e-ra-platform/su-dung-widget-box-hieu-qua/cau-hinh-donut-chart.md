---
description: New update 07/2024
---

# Cấu hình Donut Chart

### Hướng dẫn cấu hình tính năng Donut Chart

&#x20;   \- Demo với Donut chart về: Thời gian hoạt động của động cơ (trong 24 giờ).

&#x20;

_**B1: Tạo Device**_

\- Kích hoạt tạo Device: Ở trang DEVELOPER Web E-Ra -> chọn All gateways -> chọn  gateway “Hướng dẫn E-Ra” đã tạo trước đó -> menu Input/Output pins -> chọn Setup -> Confirm.

<figure><img src="../../../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

\- Tạo Device: New Input/Output Pin -> tại ô Device name điền “Động cơ” -> Create.

<figure><img src="../../../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Cấu hình Device: Click chọn device “Động cơ” vừa tạo -> chọn menu Virtual pin -> New virtual pin -> lần lượt tạo các config On\_Timer, Off\_Timer, Fail\_Timer tương ứng với các PIN V6, V7, V8 và Value type là Number.

<figure><img src="../../../.gitbook/assets/image (2) (1).png" alt=""><figcaption></figcaption></figure>

_**B2: Cấu hình Dashboard:**_

\- Add Widget: Ở trang DEVELOPER Web E-Ra -> chọn Dashboard Units -> chọn Unit  “Hướng dẫn sử dụng E-Ra” -> Edit Dashboard -> tìm và click chọn widget Donut chart race -> Add Widget.

\- Cấu hình Widget: Góc phải trên cùng widget -> chọn biểu tượng bánh răng (setting widget) -> Đặt tên Widget Name, tạo Sub unit, tạo Device display và cài đặt các Setting value như hình bên dưới -> chọn OK.

<figure><img src="../../../.gitbook/assets/image (3) (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../.gitbook/assets/image (4) (1).png" alt=""><figcaption></figcaption></figure>

_**B3: Xem kết quả:**_ Chọn Done bên dưới góc phải và xem kết quả.

<figure><img src="../../../.gitbook/assets/image (5) (1).png" alt=""><figcaption></figcaption></figure>
