# Kích hoạt service chạy nền E-Ra trên ASUS Tinker board

**Hướng dẫn thao tác:**

1. Lấy token của gateway

Truy cập vào E-Ra Dashboard:

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption><p>Truy cập vào E-Ra Dashboard</p></figcaption></figure>

Vào mục "Tất cả gateways" và chọn gateway muốn lấy token:

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption><p>Vào gateway</p></figcaption></figure>

Trong mục "Thông tin" của gateway tìm đến "Mã xác thực" rồi tiến hành copy mã token:

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption><p>Copy mã xác thực</p></figcaption></figure>

2. Kích hoạt service chạy nền E-Ra trên Tinker board

_Mở <mark style="color:orange;">**LXTerminal**</mark> (<mark style="color:orange;">Start menu</mark> > <mark style="color:orange;">System Tools</mark> > <mark style="color:orange;">LXTerminal</mark>) hoặc SSH đến Tinker Board_

_**Copy / paste** lệnh sau:_

```
cd ~/era-lib/linux/Startup/
```

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption><p>Đưa con trỏ về thư mục Startup</p></figcaption></figure>

Chỉnh sửa file **token.txt** trong thư **Startup** bằng lệnh sau:

```
sudo nano token.txt
```

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption><p>Chỉnh sửa file token.txt</p></figcaption></figure>

Xóa nội dung trong file **token.txt** và paste token đã copy ở trên vào

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption><p>Xóa nội dung trong file token.txt</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption><p>Paste token</p></figcaption></figure>

Lưu file **token.txt** lại bằng cách nhấn tổ hợp phím sau:

```
Ctrl + X
```

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption><p>Lưu file token.txt</p></figcaption></figure>

Nhấn tiếp phím **"Y"** để lưu lại

<figure><img src="../.gitbook/assets/image (9).png" alt=""><figcaption><p>Lưu file token.txt</p></figcaption></figure>

Nhấn **enter** để hoàn tất chỉnh sửa file **token.txt**

Kích hoạt **service** chạy nền **E-Ra** bằng lệnh sau:

```
source ./build.sh tinker
```

<figure><img src="../.gitbook/assets/image (11).png" alt=""><figcaption><p>Kích hoạt service</p></figcaption></figure>

Kiểm tra **E-Ra service** đã kích hoạt hay chưa bằng cách nhập lệnh sau:

```
sudo systemctl status era
```

<figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption><p>Kiểm tra trạng thái của service</p></figcaption></figure>

Quay trở lại **E-Ra dashboard** kiểm tra trạng thái của **Tinker Board**

<figure><img src="../.gitbook/assets/image (13).png" alt=""><figcaption><p>Kiểm tra trạng thái gateway</p></figcaption></figure>

Hoàn thành quá trình kích hoạt **service** chạy nên **E-Ra** trên **Tinker Board**

* <mark style="color:red;">**Note: Xóa service chạy nền bằng lệnh sau**</mark>

```
source ./remove.sh
```

