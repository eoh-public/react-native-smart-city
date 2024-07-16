# ASUS Tinker Board

{% file src="../../.gitbook/assets/HuongDan_TinkerBoard_V1.0" %}
File Hướng dẫn Offline
{% endfile %}

## HƯỚNG DẪN TINKER BOARD

## 1. Cài đặt Tinker OS.

### 1.1. Yêu cầu:

\- Phần mềm Balena Etcher (Burn OS vào thẻ nhớ SD): chọn và tải phiên bản phù hợp với hệ điều hành tại [đây](https://etcher.balena.io/#download-etcher).

<figure><img src="../../.gitbook/assets/image (12) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Tinker OS: tải tại [đây](https://tinker-board.asus.com/download-list.html).

Chọn board Tinker Board S R2.0

<figure><img src="../../.gitbook/assets/image (13) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

Nhấn vào download để tải Tinker Board S R2.0 Debian 10 V3.0.23

<figure><img src="../../.gitbook/assets/image (14) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Phần mềm RealVNC Viewer (Remote Tinker Board): chọn và tải phiên bản phù hợp với hệ điều hành tại [đây](https://www.realvnc.com/en/connect/download/viewer/).

&#x20;

<figure><img src="../../.gitbook/assets/image (15) (1).png" alt=""><figcaption></figcaption></figure>

### 1.2. Cài đặt Tinker OS

\- Cho thẻ nhớ SD vào đầu đọc và kết nối vào máy tính.

\- Chọn file Tinker OS đã tải ở phía trên -> Chọn thẻ nhớ SD muốn cài Tinker OS -> Nhấn Flash.

<figure><img src="../../.gitbook/assets/image (17) (1).png" alt=""><figcaption></figcaption></figure>

\- Đợi quá trình cài đặt OS vào thẻ nhớ SD.

<figure><img src="../../.gitbook/assets/image (18) (1).png" alt=""><figcaption></figcaption></figure>

\- Hoàn tất quá trình cài đặt Tinker OS vào thẻ nhớ SD.

<figure><img src="../../.gitbook/assets/image (21) (1).png" alt=""><figcaption></figcaption></figure>

\- Tiến hành ngắt đầu đọc thẻ nhớ -> tháo thẻ nhớ và lắp vào Tinker Board S R2.0

\- Kết nối bàn phím, chuột thông qua USB và màn hình thông qua HDMI

\- Cấp nguồn cho Tinker Board và đợi quá trình khởi động hoàn tất.

<figure><img src="../../.gitbook/assets/image (23) (1).png" alt=""><figcaption></figcaption></figure>

<mark style="color:red;">\*Lưu ý:</mark>

<mark style="color:red;">User và password mặc định của Tinker OS:</mark>

<mark style="color:red;">User: linaro</mark>

<mark style="color:red;">Pass: linaro</mark>\


### 1.3. Kết nối WiFi cho Tinker Board

\- Click vào biểu tượng Internet ở góc dưới bên phải màn hình vào chọn WiFi muốn kết nối

<figure><img src="../../.gitbook/assets/image (24) (1).png" alt=""><figcaption></figcaption></figure>

\- Nhập mật khẩu WiFi và nhấn Connect và đợi kết nối hoàn tất.

<figure><img src="../../.gitbook/assets/image (25) (1).png" alt=""><figcaption></figcaption></figure>

\- Kết nối WiFi thành công

<figure><img src="../../.gitbook/assets/image (26) (1).png" alt=""><figcaption></figcaption></figure>

\- Nhấn vào Start (Góc trái bên dưới màn hình) -> System Tools -> LXTerminal

<figure><img src="../../.gitbook/assets/image (27) (1).png" alt=""><figcaption></figcaption></figure>

\- Tiến hành update Tinker OS:

Chạy 2 dòng lệnh sau để tiến hành update Tinker OS:

_<mark style="color:orange;background-color:blue;">sudo apt update –y</mark>_

<figure><img src="../../.gitbook/assets/image (28) (1).png" alt=""><figcaption></figcaption></figure>

_<mark style="color:orange;background-color:blue;">sudo apt upgrade –y</mark>_

<figure><img src="../../.gitbook/assets/image (29) (1).png" alt=""><figcaption></figcaption></figure>

\- Kiếm tra địa chỉ IP và MAC của Tinker Board (Phục vụ cho việc Remote)

Cho chạy lệnh sau bằng LXTerminal

_<mark style="color:orange;background-color:blue;">sudo ipconfig wlan0</mark>_

<figure><img src="../../.gitbook/assets/image (30) (1).png" alt=""><figcaption></figcaption></figure>

Ví dụ ở đây địa chỉ IP: 192.168.1.15 và MAC: b4:8c:9d:38:a6:07

### 1.4. Cấu hình Tinker Board

#### 1.4.1. Cập nhật timezone cho Tinker Board

\- Cập nhật timezone sang múi giờ Hồ Chí Minh cho Tinker Board bằng lệnh sau:

_<mark style="color:orange;background-color:blue;">sudo timedatectl set-timezone Asia/Ho\_Chi\_Minh</mark>_

<figure><img src="../../.gitbook/assets/image (31) (1).png" alt=""><figcaption></figcaption></figure>

#### 1.4.2. Kích hoạt tính năng SSH

\- Vào chế độ Tinker Config bằng lệnh sau:

_<mark style="color:orange;background-color:blue;">sudo tinker-config</mark>_

<figure><img src="../../.gitbook/assets/image (32) (1).png" alt=""><figcaption></figcaption></figure>

\- Sau khi vào Tinker Config tiến hành nhấn OK

<figure><img src="../../.gitbook/assets/image (33) (1).png" alt=""><figcaption></figcaption></figure>

\- Chọn Interfacing Options và nhấn OK

<figure><img src="../../.gitbook/assets/image (34) (1).png" alt=""><figcaption></figcaption></figure>

\- Chọn SSH và nhấn Select

<figure><img src="../../.gitbook/assets/image (35) (1).png" alt=""><figcaption></figcaption></figure>

\- Chọn Enable để kích hoạt SSH

<figure><img src="../../.gitbook/assets/image (36) (1).png" alt=""><figcaption></figcaption></figure>

\- Kích hoạt SSH hoàn tất -> nhấn OK để quay lại màn hình Tinker Config&#x20;

#### 1.4.3. Kích hoạt tính năng VNC:

\- Từ màn hình Interface Options (Tinker Config) chọn VNC và nhấn Select

<figure><img src="../../.gitbook/assets/image (37).png" alt=""><figcaption></figcaption></figure>

\- Đợi quá trình cài đặt VNC

<figure><img src="../../.gitbook/assets/image (38).png" alt=""><figcaption></figcaption></figure>

Trong quá trình cài đặt VNC sẽ yêu cầu nhập mật khẩu (để remote desktop)

<figure><img src="../../.gitbook/assets/image (39).png" alt=""><figcaption></figcaption></figure>

Đối với dòng “Would you like to enter a view-only password” nhập n và nhấn enter

\- Sau khi cài đặt thành công VNC server sẽ tạo port 5901

<figure><img src="../../.gitbook/assets/image (40).png" alt=""><figcaption></figcaption></figure>

\- Từ đây có thể mở phần mềm VNC Viewer nhập địa chỉ IP và Port 5901 để tiến hành remote desktop

<mark style="color:red;">Pass: Pass đã nhập trong quá trình cài VNC Tinker Board</mark>

![](<../../.gitbook/assets/image (41).png>)&#x20;

#### 1.4.4. Kích hoạt GPIO chức năng trên Tinker Board

\- Từ màn hình LXTerminal nhập lệnh sau và nhấn enter

_<mark style="color:orange;background-color:blue;">sudo nano /boot/config.txt</mark>_

\- Thay đổi nội dung giống bên dưới để kích hoạt i2c1, spi2, pwm2, pwm3, uart1...

<figure><img src="../../.gitbook/assets/image (43).png" alt=""><figcaption></figcaption></figure>

Lưu lại bằng cách nhấn tổ hợp Ctrl + X.

<figure><img src="../../.gitbook/assets/image (44).png" alt=""><figcaption></figcaption></figure>

Nhấp tiếp phím Y.

<figure><img src="../../.gitbook/assets/image (45).png" alt=""><figcaption></figcaption></figure>

Nhấn phím Enter để lưu.

\- Reset Tinker Board băng cách gõ lệnh sau:

_<mark style="color:orange;background-color:blue;">sudo init 6</mark>_

## 2. Kết nối Tinker Board lên ERa

### 2.1. Cài đặt thư viện ERa và WiringPI

\- Từ LXTerminal nhập lệnh sau để tải thư viện ERa

_<mark style="color:orange;background-color:blue;">cd \~</mark>_

_<mark style="color:orange;background-color:blue;">git clone</mark>_ [_<mark style="color:orange;background-color:blue;">https://github.com/eoh-jsc/era-lib.git</mark>_](https://github.com/eoh-jsc/era-lib.git)

<figure><img src="../../.gitbook/assets/image (46).png" alt=""><figcaption></figcaption></figure>

\- Nhập tiếp 2 lệnh sau:

_<mark style="color:orange;background-color:blue;">cd era-lib/linux</mark>_

_<mark style="color:orange;background-color:blue;">source ./build.sh tinker</mark>_

<figure><img src="../../.gitbook/assets/image (47).png" alt=""><figcaption></figcaption></figure>

\- Cài đặt ERa và WiringPI hoàn tất

<figure><img src="../../.gitbook/assets/image (48).png" alt=""><figcaption></figcaption></figure>

### 2.2. Kêt nối

\- Truy cập vào ERa theo đường dẫn: [E-RA](https://app.e-ra.io/login).

\- Đăng nhập.

\- Vào mục Developer -> Dashboard Units -> Create Unit -> Nhập tên Unit và Location -> Nhấn Create.

<figure><img src="../../.gitbook/assets/image (8) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (9) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Qua mục All gateways -> New Gateway -> Đặt tên gateway -> chọn board ASUS Tinker S R2.0 -> chọn Unit Tinker Board đã tạo phía trên -> nhấn Next Step.

<figure><img src="../../.gitbook/assets/image (10) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Nhấn Next Step (ERa, Tinker OS, WiringPi đã được cài ở phía trên).

<figure><img src="../../.gitbook/assets/image (14) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Copy dòng code ở mục “Run ERa with your token” và nhấn Next Step.

<figure><img src="../../.gitbook/assets/image (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (2) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Dán dòng lệnh vừa copy vào LXTerminal và nhấn Enter -> Đợi quá trình kết nối hoàn tât.

<figure><img src="../../.gitbook/assets/image (3) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Đã kết nối thành công vào ERa.

<figure><img src="../../.gitbook/assets/image (4) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Quay trở lại màn hình dashboard -> nhấn vào Go To Gateway.

<figure><img src="../../.gitbook/assets/image (5) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

\- Kết nối thành công ASUS Tinker Board lên ERa.

<figure><img src="../../.gitbook/assets/image (7) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

## 3. Hướng dẫn code/Thêm thư viện

Sẽ được cập nhật ở file sau
