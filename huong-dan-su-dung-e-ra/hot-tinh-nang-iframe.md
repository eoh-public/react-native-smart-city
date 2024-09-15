---
description: New Update 07/2024
---

# \*HOT\* Tính Năng iFrame

Tính năng iFrame trên Nền tảng IoT E-Ra sẽ mang đến cho bạn khả năng tạo ra một phiên bản IoT Dashboard của riêng mình với sự tùy biến cao nhất! Bạn có thể tự xây dựng ý tưởng, giao diện mới, giải pháp mới cho các dự án của mình như Human Detection, Map Tracking, 2D, 3D Visualization...v.v.

### Hướng dẫn tạo widget mới bằng tính năng iFrame with config

#### Bước 1: Đăng nhập vào tài khoản GitHub

Truy cập vào [GitHub](https://github.com/) và đăng nhập bằng tài khoản của bạn.

#### Bước 2: Tạo một Repository mới

* Truy cập vào [GitHub Repository](https://github.com/new) để tạo một repository mới.
* Điền thông tin:
  * **Repository name** (tên repository) _bắt buộc_.&#x20;
  * **Description** (mô tả) _tùy chọn_.
  * Chọn **Public**.
  * Chọn **Add a README file**.
  * Nhấn **Create repository** để hoàn tất.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 11.32.07.png" alt=""><figcaption></figcaption></figure>

#### Bước 3: Đưa file HTML lên GitHub

* Tải file`switch.html.zip`về máy của bạn [nhấp vào đây để tải](https://github.com/eoh-jsc/era-widget-switch/raw/main/switch.html.zip)
* Giải nén ra bạn sẽ thấy file `index.html`
* Thêm file `index.html` này vào repository mà bạn vừa tạo ở bước 2.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 11.59.37.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 13.04.52.png" alt=""><figcaption></figcaption></figure>

#### Bước 4: Kích hoạt GitHub Pages

* Vào **Settings** của repository, sau đó chọn **Pages**.
* Trong trang **GitHub Pages**, tìm đến mục **Source**, chọn **GitHub Actions**.
* Tại mục **GitHub Pages Jekyll**, nhấn **Configure**, sau đó nhấn **Commit changes**.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 12.15.48.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 12.21.45.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 12.24.46.png" alt=""><figcaption></figcaption></figure>

* Vào mục **Actions**, chọn **Create jekyll-gh-pages.yml**.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 12.29.17.png" alt=""><figcaption></figcaption></figure>

* Đợi quá trình hoàn tất cho đến khi xuất hiện dấu tick xanh.
* Ở phần deploy, nhấn vào đường link được tạo dưới phần **deploy**. Một tab mới sẽ mở ra với widget switch mới của bạn.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 12.38.28.png" alt=""><figcaption></figcaption></figure>

#### Bước 5: Cấu hình iFrame with config

* Truy cập vào **Dashboard Units** và chọn Unit của bạn.
* Nhấn **Edit Dashboard**.
* Ở phần **Widget Box** (nằm ở cuối cùng bên trái), kéo và thả widget **iFrame With Config** vào Dashboard.
* Nhấn vào biểu tượng bánh răng ở góc phải trên của widget **iFrame With Config** để cấu hình theo yêu cầu.
* Nhấn **OK** sau khi cấu hình xong.
* Cuối cùng, nhấn **Done** và kiểm tra kết quả sau khi điều khiển nút nhấn.



<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

\- Click chọn biểu tượng bánh răng (setting widget) bên góc phải trên cùng widget iFrame With ConFig -> cấu hình như hình -> OK.

<figure><img src="../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

\- Chọn Done -> Xem kết quả cập nhật trạng thái sau khi điều khiển nút nhấn.

<figure><img src="../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>
