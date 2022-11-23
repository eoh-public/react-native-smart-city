# Raspberry Pi

Lưu ý:

* Xem sơ đồ chân của Raspberry Pi tại [đây](https://pinout.xyz/pinout/wiringpi)&#x20;
* Tài khoản mặc định của Raspberry Pi:&#x20;

![](<../../.gitbook/assets/image (19) (1).png>)

Hướng dẫn:&#x20;

Bước 1: Cài Raspbian OS cho Raspberry Pi ([Hướng dẫn](https://raspberrypi.vn/huong-dan-cai-dieu-hanh-cho-raspberry-pi-2457.pi) hoặc [Hướng dẫn](https://www.proe.vn/huong-dan-cai-dat-he-dieu-hanh-cho-raspberry-pi)).&#x20;

Bước 2: Kết nối màn hình (bằng hdmi) hoặc remote Raspberry Pi (bằng ssh [Hướng dẫn](https://tapit.vn/cai-dat-va-truy-cap-raspberry-thong-qua-remote-desktop-connection/)).&#x20;

Bước 3: Kết nối internet cho Raspberry Pi (Wifi hoặc Ethernet).&#x20;

Bước 4: Mở terminal trên Raspberry Pi.&#x20;

Bước 5: Cài đặt thư viện Wiring Pi bằng terminal.&#x20;

[http://wiringpi.com/download-and-install/](http://wiringpi.com/download-and-install/)&#x20;

Bước 6: Tải thư viện ERa và build ERa bằng terminal.&#x20;

```
$ git clone https://github.com/eoh-jsc/era-lib.git
$ cd era-lib/linux
$ make clean all target=raspberry
```

Bước 7: Run ERa bằng terminal (thay YourAuthToken bằng ERa token – Lấy được từ bước 3 add gateway trên App dashboard).

```
$ sudo ./era --token=YourAuthToken
```

<figure><img src="../../.gitbook/assets/image (32).png" alt=""><figcaption><p>Connect Era thành công</p></figcaption></figure>

<mark style="color:red;">Lưu ý:</mark>&#x20;

Để sử dụng được uart của raspberry để giao tiếp với modbus, zigbee... cần enable uart hardware và disable uart console xem hướng dẫn tại [đây](https://pivietnam.com.vn/setup-uart-tren-raspberry-pi-pivietnam-com-vn.html).&#x20;

<mark style="color:red;">Kết nối Modbus:</mark>&#x20;

Kết nối module Modbus với board Raspberry Pi theo sơ đồ chân bên dưới.&#x20;

| Module Modbus  | RASPBERRY PI  |
| -------------- | ------------- |
| RX             | GPIO 15       |
| TX             | GPIO 14       |

&#x20;<mark style="color:red;">Tham khảo thêm tại:</mark>&#x20;

[Installing Libraries | Arduino Documentation | Arduino Documentation](https://docs.arduino.cc/software/ide-v1/tutorials/installing-libraries)&#x20;

[Library Management — PlatformIO latest documentation](https://docs.platformio.org/en/latest/librarymanager/index.html)&#x20;
