---
description: Era hỗ trợ trải nghiệm được khi Module Zigbee kết nối với ESP32 và Raspberry
---

# Giai đoạn 1: Nạp code cho mạch zigbee

## 1. Yêu cầu phần cứng

**Era hỗ trợ trải nghiệm được khi Module Zigbee kết nối với ESP32 và Raspberry**

{% file src="../../../../.gitbook/assets/[IU] Huong dan ESP32_30Pin-CC2530.pdf" %}
Tài liệu hướng dẫn kết nối ESP32
{% endfile %}

{% file src="../../../../.gitbook/assets/[IU] Huong dan Raspberry Pi 3 Model B+ (2).pdf" %}
Tài liệu hướng dẫn kết nối Raspberry
{% endfile %}

* Mạch nạp CC Debugger.

![](<../../../../.gitbook/assets/image (68).png>)

* USB CC2531 Dogle hoặc CC2530.

![](<../../../../.gitbook/assets/image (70).png>)![](<../../../../.gitbook/assets/image (64) (2).png>)![](<../../../../.gitbook/assets/image (58) (2).png>)

## 2. Yêu cầu phần mềm

SmartRF Flash Programmer V1: tải tại [đây](https://www.ti.com/tool/FLASH-PROGRAMMER#downloads).&#x20;

<figure><img src="../../../../.gitbook/assets/image (4) (6).png" alt=""><figcaption></figcaption></figure>

## 3. Hướng dẫn

B1: Truy cập vào link github sau [Github](https://github.com/eoh-jsc/era-lib/releases/latest).&#x20;

<figure><img src="../../../../.gitbook/assets/image (1) (3).png" alt=""><figcaption></figcaption></figure>

B2: Click và tải file zip có tên sau: ERa\_Coordinator\_xxx.zip.&#x20;

B3: Giải nén file zip vừa mới tải về sẽ được 4 file sau.&#x20;

<figure><img src="../../../../.gitbook/assets/image (71).png" alt=""><figcaption></figcaption></figure>

B4: Chọn file tương thích với module zigbee bạn đang có.&#x20;

B5: Giải nén file zip sẽ được file hex tương ứng để upload chương trình.&#x20;

Ví dụ: muốn upload code cho CC2530 -> giải nén CC2530.zip được file CC2530.hex.&#x20;

<figure><img src="../../../../.gitbook/assets/image (57) (1).png" alt=""><figcaption></figcaption></figure>

B6: Kết nối mạch nạp CC Debugger với module CC2530 (xem tài liệu kết nối phần cứng tại [ESP32](https://2945081884-files.gitbook.io/\~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FmbHxg1WchiSe0ofLbqPf%2Fuploads%2FFvcdu2gGwrXsB0HQ9LQm%2F\[IU]%20Huong%20dan%20ESP32\_30Pin-CC2530.pdf?alt=media\&token=7a3a1fec-db4b-45e7-802d-42c5d5c5061d) hoặc [Raspberry](https://2945081884-files.gitbook.io/\~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FmbHxg1WchiSe0ofLbqPf%2Fuploads%2FvZnsGII5kCbo4XKgT6Yp%2F\[IU]%20Huong%20dan%20Raspberry%20Pi%203%20Model%20B%2B.pdf?alt=media\&token=c2f9dde1-13f0-46e0-a781-8ffe05f36ab0)).&#x20;

**CC2530:**

<figure><img src="../../../../.gitbook/assets/image (69).png" alt=""><figcaption></figcaption></figure>

B7: Mở phần mềm SmartRF Flash Programmer V1

<figure><img src="../../../../.gitbook/assets/image (72).png" alt=""><figcaption></figcaption></figure>

B8: Kết nối mạch nạp (đầu USB) vào máy tính, nếu thành công sẽ có thông tin của chip trong SmartRF Flash Programmer V1.

<figure><img src="../../../../.gitbook/assets/image (61) (2).png" alt=""><figcaption></figcaption></figure>

B9: Chọn Erase -> Perform actions -> Read IEEE để unlock chip và đọc IEEE address của chip.

<figure><img src="../../../../.gitbook/assets/image (53) (2).png" alt=""><figcaption></figcaption></figure>

B10: Chọn file hex Flash image -> Erase, program and verify -> Perform actions để upload chương trình -> Đợi quá trình upload chương trình thành công.

<figure><img src="../../../../.gitbook/assets/image (2) (2).png" alt=""><figcaption></figcaption></figure>

Bước 11: Tiến hình thêm mới thiết bị device zigbee tại [đây](giai-doan-2\_-cau-hinh-thong-so.md)&#x20;
