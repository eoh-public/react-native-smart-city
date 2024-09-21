# Public API ERa hỗ trợ

**Ghi chú**

* Swagger API E-ra [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/)
* Document API E-ra [https://backend.eoh.io/redoc/](https://backend.eoh.io/redoc/)

## 1. Hướng dẫn lấy mã AUTHTOKEN

**Bước 1:** Đăng nhập app.e-ra.io

**Bước 2:** Nhấp vào ảnh đại diện >> Chọn profile

![](<.gitbook/assets/image (74).png>)

**Bước 3:** Copy AUTHTOKEN&#x20;

<mark style="color:red;">Lưu ý thông tin</mark> <mark style="color:red;"></mark><mark style="color:red;">**AUTHTOKEN**</mark> <mark style="color:red;"></mark><mark style="color:red;">là thông tin quan trọng không được để lộ ra bên ngoài. Khi bạn chọn đăng xuất khỏi tất cả các thiết bị, mã</mark> <mark style="color:red;"></mark><mark style="color:red;">**AUTHTOKEN**</mark> <mark style="color:red;"></mark><mark style="color:red;">sẽ được khởi tạo lại.</mark>

![](<.gitbook/assets/image (68).png>)

## 2. **Hướng dẫn cài đặt A**uthorizations **trên** [swagger](https://backend.eoh.io/swagger/):&#x20;

B1: Truy cập vào [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/) (Danh sách API của EoH)

B2: Điền mã AUTHTOKEN >> Nhấn Authorize >> Nhấn Close

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 17.49.02.png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/Screenshot 2024-07-26 at 09.51.19.png" alt=""><figcaption></figcaption></figure>

B3: Như vậy là xong, bây giờ bạn có thể thực hành gọi các API có trong [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/)

<mark style="color:red;">(Lưu ý thông tin AUTHTOKEN là thông tin quan trọng không được để lộ ra bên ngoài)</mark>

## 3. **Hướng dẫn thực hành gọi một số API trên EoH**

#### <mark style="color:red;">Cần cài đặt</mark> <mark style="color:red;"></mark><mark style="color:red;">**A**</mark><mark style="color:red;">uthorizations trước khi thực hành.</mark>

Các hướng dẫn dưới đây có sử dụng các thuật ngữ như 'config', 'end device', v.v. Để hiểu rõ hơn về các thuật ngữ này, bạn có thể truy cập vào [<mark style="color:red;">https://e-ra-iot-wiki.gitbook.io/documentation/huong-dan-su-dung-e-ra/thuat-ngu-can-quan-tam</mark>](https://e-ra-iot-wiki.gitbook.io/documentation/huong-dan-su-dung-e-ra/thuat-ngu-can-quan-tam)

#### 3.1 Thực hành gọi API lấy giá trị hiện tại của config trên swagger

* B1. Truy cập vào [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/). Tìm đến API GET \`chip\_manager/configs/\`. Để lấy danh sách config bạn đang có. Sau đó nhấn vào "Try it out"

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.19.59.png" alt=""><figcaption></figcaption></figure>

* B2. Nhấn vào "Execute"

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.26.03.png" alt=""><figcaption></figcaption></figure>

* B3. Bạn sẽ nhận được dữ liệu trả về từ API \`chip\_manager/configs/\` . Bao gồm nhiều thông tin của config vị dụ như id, name, unit, scale, ....

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.29.23.png" alt=""><figcaption></figcaption></figure>

* B4. Sử dụng API `/chip_manager/configs/{id}/current_value/` Để nhận giá trị hiện tại của config.  Từ B3 ở trên API \`/chip\_manager/configs/\` đã trả về thông tin config id, ở đây mình lấy config id = 21973 làm ví dụ.

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.32.38.png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.38.29.png" alt=""><figcaption></figcaption></figure>

*   B5. Như vậy là xong từ việc gọi  API `/chip_manager/configs/{id}/current_value/`&#x20;

    chúng ta đã có giá trị hiện tại của config `current_value_only": 0`

Một cách khác là sử dụng công cụ dòng lệnh CURL.&#x20;

B1: Hãy kiểm tra xem CURL đã được cài đặt trên máy của bạn chưa bằng cách chạy lệnh \`curl --version\` trên terminal. Nếu không có thông báo lỗi nào xuất hiện, điều đó có nghĩa là CURL đã được cài đặt thành công. Ngược lại bạn cần tìm kiếm hướng dẫn cài đặt CURL trên mạng.

<figure><img src=".gitbook/assets/Screenshot 2024-07-26 at 10.56.17.png" alt=""><figcaption></figcaption></figure>

B2: Bạn copy dòng lệnh curl trên swagger và chạy nó trên terminal của bạn.

<figure><img src=".gitbook/assets/Screenshot 2024-07-26 at 10.44.35.png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/Screenshot 2024-07-26 at 11.04.53.png" alt=""><figcaption></figcaption></figure>

B3: Như vậy là xong từ việc sử dụng CURL chúng ta đã có giá trị hiện tại của config `current_value_only": 0`

#### **3.2 Thực hành gọi API điều khiển thiết bị trên swagger**

Để điều khiển được thiết bạn cần có `action key`

* B1. Gọi API **\`**/property\_manager/units/mine/\`. Để lấy thông tin device id.

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 23.14.43.png" alt=""><figcaption></figcaption></figure>

* B2 Sau khi có device id bạn sử dụng API \`/property\_manager/devices/{device\_id}/display/\` . Để lấy action key&#x20;

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 23.19.14.png" alt=""><figcaption></figcaption></figure>

Ví dụ chúng ta có:

**action\_on: c163e4a9-79a6-4ae5-9dd9-c5cf8377d3e3**

**action\_off: dbd5b4d7-8c5c-485f-8aca-90474ffe9d84**

* B3 Sau khi có action key bạn sử dụng API \`/chip\_manager/trigger\_action/\` để điều khiển thiết bị.

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 23.23.32.png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/Screenshot 2024-07-26 at 09.59.36.png" alt=""><figcaption></figcaption></figure>

Xin lưu ý rằng một số action key có thể không cần trường data. Nếu action của bạn cần truyền data, bạn có thể điều chỉnh thêm nếu cần thiết.

<figure><img src=".gitbook/assets/Screenshot 2024-09-21 at 12.34.18.png" alt=""><figcaption></figcaption></figure>
