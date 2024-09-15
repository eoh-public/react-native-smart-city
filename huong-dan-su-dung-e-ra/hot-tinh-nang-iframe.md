---
description: New Update 07/2024
---

# \*HOT\* Tính Năng iFrame

Tính năng iFrame trên Nền tảng IoT E-Ra sẽ mang đến cho bạn khả năng tạo ra một phiên bản IoT Dashboard của riêng mình với sự tùy biến cao nhất! Bạn có thể tự xây dựng ý tưởng, giao diện mới, giải pháp mới cho các dự án của mình như Human Detection, Map Tracking, 2D, 3D Visualization...v.v.

### Hướng dẫn tạo widget mới bằng tính năng iFrame with config

#### Kết quả mong đợi

Sau khi hoàn thành hướng dẫn này, bạn sẽ tạo thành công một giao diện nút nhấn mới cho phép bật/tắt đèn LED, và theo dõi trạng thái của nó theo thời gian thực.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 17.22.18.png" alt=""><figcaption></figcaption></figure>

#### Chuẩn bị trước

* Bạn cần đảm bảo đã có sẵn **một unit** và đã **kích hoạt một gateway** hoạt động online.
* Cấu hình **datastream** và **action** để điều khiển đèn LED.
* Cấu hình **giao diện nút nhấn** để bật/tắt đèn LED, đảm bảo nút nhấn của bạn hoạt động ổn định và điều khiển chính xác.

Khi mọi thứ đã sẵn sàng, chúng ta sẽ bắt đầu tạo widget mới.

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

#### Bước 5: Lấy URL trang GitHub Pages

*   Sau khi hoàn tất các bước trên, ở phần **Deploy**, bạn sẽ thấy một đường dẫn (URL). Hãy sao chép URL này, vì bạn sẽ cần sử dụng nó trong Bước 6.

    Khi nhấn vào đường dẫn một tab mới sẽ mở ra và bạn sẽ thấy widget switch mới của bạn.&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 12.38.28.png" alt=""><figcaption></figcaption></figure>

#### Bước 6: Cấu hình iFrame with config

* Truy cập vào [**Dashboard Units**](https://app.e-ra.io/) và chọn Unit của bạn.
* Nhấn **Edit Dashboard**.
* Ở phần **Widget Box** (nằm ở cuối cùng bên trái), sau đó kéo và thả widget **iFrame With Config** vào Dashboard của bạn.
* Nhấp vào biểu tượng bánh răng (⚙️) ở góc phải trên của widget để bắt đầu cấu hình widget **iFrame With Config**

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 20.16.22.png" alt=""><figcaption></figcaption></figure>

#### Cấu hình widget **iFrame With Config**:

1. Điền đầy đủ các thông tin **Khu vực, Thiết bị hiển thị**.
2. **URL**: Dán URL bạn đã sao chép từ **Bước 5**.
3. **Giá trị hiện thời (Realtime Configs)**: Tạo một giá trị mới và nhập datastream "Trạng thái LED" của bạn vào.
4. **Hành động (Actions)**: Tạo hai  2 giá trị mới, đó là 2 hành động bật và tắt đèn LED của bạn.
5. Sau khi hoàn tất cấu hình, nhấn **OK** để lưu lại.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 17.37.33.png" alt=""><figcaption></figcaption></figure>

* Cuối cùng, nhấn **Done** và kiểm tra kết quả sau khi điều khiển nút nhấn.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 20.31.23.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 20.35.03.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Screenshot 2024-09-15 at 20.36.43.png" alt=""><figcaption></figcaption></figure>
