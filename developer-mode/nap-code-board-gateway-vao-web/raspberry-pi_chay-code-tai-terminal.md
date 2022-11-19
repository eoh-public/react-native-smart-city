# Raspberry Pi\_Chạy code tại Terminal

**Bước 1:** Ghim dây nguồn, dây HDMI, chuột và bàn phím vào gatway Raspberry Pi

<figure><img src="../../.gitbook/assets/image (2) (4).png" alt=""><figcaption></figcaption></figure>

**Bước 2:** Khi hoàn thành cắm dây cửa sổ màn hình sẽ tự mở Terminal của Raspberry đẻ tiến hành chạy các lệnh code

<figure><img src="../../.gitbook/assets/image (10) (5).png" alt=""><figcaption></figcaption></figure>

**Bước 3:** Trên web, ấn thêm mới gateway và chọn loại board Raspberry Pi --> Tại bước install Library  mở link **** [http://wiringpi.com/download-and-install/](http://wiringpi.com/download-and-install/)

<figure><img src="../../.gitbook/assets/image (36).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>

**Bước 4:** Trong Terminal của Raspberry chạy lệnh&#x20;

```
sudo apt-get install wiringpi
```

<figure><img src="../../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

**Bước 5:** Terminal của Raspberry chạy lệnh để kiểm tra xem wirePi được cài đặt chưa

```
$ gpio -v
```

<figure><img src="../../.gitbook/assets/image (27).png" alt=""><figcaption></figcaption></figure>

**Bước 6:** Bấm next step để chuyển sang  bước: Code

<figure><img src="../../.gitbook/assets/image (51).png" alt=""><figcaption></figcaption></figure>

**Bước 7:** Terminal của Raspberry tiếp tục chạy lần lượt từng lệnh dưới đây

```
$ git clone https://github.com/eoh-jsc/era-lib.git 
$ cd era-lib/linux 
$ make clean all target=raspberry
```

<figure><img src="../../.gitbook/assets/image (19) (2).png" alt=""><figcaption></figcaption></figure>

**Bước 8:** Terminal của Raspberry tiếp tục chạy lệnh Token được sinh ra theo từng gateway

```
$ sudo ./era --token=1er43
```

<figure><img src="../../.gitbook/assets/image (1) (5).png" alt=""><figcaption></figcaption></figure>

**Bước 9:** Bấm Next Step để tiến hành nạp codem đợi 30-60 giây

<figure><img src="../../.gitbook/assets/image (4) (1).png" alt=""><figcaption></figcaption></figure>

**Bước 10:** Ấn go to gateway để hoàn tất add gateway

&#x20;

<figure><img src="../../.gitbook/assets/image (52).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (8) (2).png" alt=""><figcaption></figcaption></figure>
