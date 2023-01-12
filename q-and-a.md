---
description: Tổng hợp các câu hỏi thường gặp về E-Ra
---

# Q\&A

<details>

<summary><strong>E-Ra Có Thu Phí Không?</strong></summary>

Hiện tại E-Ra đang không thu phí người dùng. Bạn trải nghiệm hoàn toàn FREE. Về bảng phí cho các gói tính năng cao cấp E-Ra Team sẽ công bố khi có thông tin chính thức.

</details>

<details>

<summary><strong>Mình có thắc mắc thì nhờ team E-Ra hỗ trợ ở đâu?</strong></summary>

Trong quá trình trải nghiệm E-Ra, nếu mình cần hỗ trợ có thể liên hệ với đội ngũ EoH tại:&#x20;

🔵EoH Forum: [https://forum.eoh.io/ ](https://forum.eoh.io/)

🔵E-Ra Telegram Group: [https://t.me/+UPiYRjvslP41YzFl](https://t.me/+UPiYRjvslP41YzFl)

🔵E-Ra Facebook Group: [https://www.facebook.com/groups/567625788148920/](https://www.facebook.com/groups/567625788148920/)

</details>

<details>

<summary><strong>E-Ra hiện đang hỗ trợ các phần cứng nào?</strong></summary>

Các phần cứng E-Ra đang hỗ trợ gồm:

\+ ESP32

\+ ESP8266

\+ STM32 (F4 Series)

\+ Raspberry Pi

\*Hiện tại E-Ra chưa hỗ trợ RTL8720.

</details>

<details>

<summary><strong>E-Ra có Virtual Pins: V0, V1,...V255 giống như Blynk không?</strong></summary>

Hiện E-Ra đã chính thức hỗ trợ Virtual Pins. Bạn có thể tham khảo các thông tin sau:

![🟠](https://static.xx.fbcdn.net/images/emoji.php/v9/tfa/1/16/1f7e0.png)Video Trải nghiệm Virtual Pins trên E-Ra: [https://youtu.be/RJzSHljwGMc](https://youtu.be/RJzSHljwGMc)

![🟠](https://static.xx.fbcdn.net/images/emoji.php/v9/tfa/1/16/1f7e0.png)Chi tiết API Virtual Pins, vui lòng truy cập vào trang wiki sau: [https://github.com/eoh-jsc/era-lib/wiki/Virtual-Pins](https://github.com/eoh-jsc/era-lib/wiki/Virtual-Pins)

</details>

<details>

<summary><strong>Mình cần chuẩn bị những gì và thực hiện các bước nào để có thể tạo nên 1 ứng dụng IoT cơ bản?</strong></summary>

Bạn có thể vào link sau để đăng ký và làm các bước theo tài liệu, video hướng dẫn nhé: [https://e-ra.io](https://e-ra.io)

Trong quá trình sử dụng nếu cần hỗ trợ có thể liên hệ với đội ngũ E-Ra tại:

🔵EoH Forum: [https://forum.eoh.io/](https://forum.eoh.io/)

🔵E-Ra Telegram Group: [https://t.me/+UPiYRjvslP41YzFl](https://t.me/+UPiYRjvslP41YzFl)

🔵E-Ra Facebook Group: [https://www.facebook.com/groups/567625788148920/](https://www.facebook.com/groups/567625788148920/)

</details>

<details>

<summary>"Mình đang lập trình giao tiếp Modbus RTU giữa ESP32 và PLC Delta DVP12SE. Và hiện đang để ESP32 là Master và PLC làm slave. Mình đang tạo code cấu hình làm slave trên PLC như này đã đủ chưa? Có cần tạo code check sum trên PLC khi ESP32 gửi request xuống không?"</summary>

Tham khảo chi tiết tại bài viết: [https://www.facebook.com/groups/567625788148920/permalink/671374087774089/](https://www.facebook.com/groups/567625788148920/permalink/671374087774089/)

</details>

<details>

<summary>How to change UART pin?</summary>

Tham khảo chi tiết tại bài viết: \
[https://github.com/eoh-jsc/era-lib/wiki/How-to-change-UART-pin](https://github.com/eoh-jsc/era-lib/wiki/How-to-change-UART-pin)

</details>

<details>

<summary>WARNING khi sử dụng thiết bị đấu nối là gì?</summary>

1. Không được để nguồn >3.3VDC chạm vào bất kì chân GPIO nào 1 cách trực tiếp.
2. Không cấp tín hiệu vào chân Input với mức điện áp > 3.3VDC.
3. Không được dùng chân GPIO điều khiển trực tiếp tải lớn hơn dòng chịu dựng trên chân GPIO của hãng ( ví dụ: < 30mA với ESP32; < 10mA với STM và Raspberry).

</details>
