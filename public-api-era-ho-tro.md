# Public API ERa hỗ trợ

**Ghi chú**

* API E-ra [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/)
* Document API E-ra [https://backend.eoh.io/redoc/](https://backend.eoh.io/redoc/)

## 1. Hướng dẫn lấy mã AUTHTOKEN

**Bước 1:** Đăng nhập app.e-ra.io

**Bước 2:** Nhấp vào ảnh đại diện >> Chọn profile

![](<.gitbook/assets/image (74).png>)

**Bước 3:** Copy AUTHTOKEN&#x20;

<mark style="color:red;">(Lưu ý thông tin AUTHTOKEN là thông tin quan trọng không được để lộ ra bên ngoài)</mark>

![](<.gitbook/assets/image (68).png>)

## 2. **Hướng dẫn cài đặt A**uthorizations **trên** [swagger](https://backend.eoh.io/swagger/):&#x20;

B1: Truy cập vào [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/) (Danh sách API của EoH)

B2: Điền mã AUTHTOKEN

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 17.49.02.png" alt=""><figcaption></figcaption></figure>

B3: Như vậy là xong, bây giờ bạn có thể thực hành gọi các API có trong [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/)

## 3. **Hướng dẫn thực hành gọi một số API trên EoH**

#### <mark style="color:red;">Cần cài đặt</mark> <mark style="color:red;"></mark><mark style="color:red;">**A**</mark><mark style="color:red;">uthorizations trước khi thực hành.</mark>

#### 3.1 Thực hành gọi API `/chip_manager/configs/` . Để lấy danh sách config bạn đang có.

* B1. Tìm đến API \`chip\_manager/configs/\`. Sau đó nhấn vào "Try it out"

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

#### **3.2 Thực hành điều khiển thiết bị thông qua API**

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

