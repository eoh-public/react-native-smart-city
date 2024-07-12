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

Bước 1: Xem danh sách API của EoH tại [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/)

Bước 2: Điền mã AUTHTOKEN

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 17.49.02.png" alt=""><figcaption></figcaption></figure>

Bước 3: Như vậy là xong, bây giờ bạn có thể thực hành gọi các API có trong [https://backend.eoh.io/swagger/](https://backend.eoh.io/swagger/)

## 3. **Hướng dẫn thực hành gọi một số API trên EoH**

#### 3.1 Thực hành gọi API `/chip_manager/configs/` . Để lấy danh sách config bạn đang có.

* B1. Tìm đến API \`chip\_manager/configs/\`. Sau đó nhấn vào "Try it out"

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.19.59.png" alt=""><figcaption></figcaption></figure>

* B2. Nhấn vào "Execute"

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.26.03.png" alt=""><figcaption></figcaption></figure>

* B3. Bạn sẽ nhận được dữ liệu từ API \`chip\_manager/configs/\` trả về, nó bao gồm khá nhiều thông tin của config vị dụ như id, name, unit, scale, ....

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.29.23.png" alt=""><figcaption></figcaption></figure>

* B4. Sử dụng API `/chip_manager/configs/{id}/current_value/` Để nhận giá trị hiện tại của config.  Từ B3 ở trên API \`/chip\_manager/configs/\` đã trả về thông tin config id, ở đây mình lấy config id = 21973 làm ví dụ.

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.32.38.png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 22.38.29.png" alt=""><figcaption></figcaption></figure>

*   B5. Như vậy là xong từ việc gọi  API `/chip_manager/configs/{id}/current_value/`&#x20;

    chúng ta đã có giá trị hiện tại của config current\_value\_only": 0&#x20;

#### **3.2 Thực hành điều khiển thiết bị thông qua API**

Để điều khiển được thiết bạn cần có `action key`

* B1. Gọi API **\`**/property\_manager/units/mine/\`. Để lấy thông tin device id.

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 23.14.43.png" alt=""><figcaption></figcaption></figure>

* B2 Sau khi có device id bạn sử dụng API \`/property\_manager/devices/{device\_id}/display/\` . Để lấy action key&#x20;

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 23.19.14.png" alt=""><figcaption></figcaption></figure>

* B3 Sau khi có action key bạn sử dụng API \`/chip\_manager/trigger\_action/\` để điều khiển thiết bị.

<figure><img src=".gitbook/assets/Screenshot 2024-07-12 at 23.23.32.png" alt=""><figcaption></figcaption></figure>

## &#x20;4. Một vài ví dụ khác

### **Bước 1: Gọi api lấy unit của user:**

* URL: [https://backend.eoh.io/api/property\_manager/units/mine/](https://backend.eoh.io/api/property\_manager/units/mine/)
* RESPONSE\_DATA:

```
{
  id: 1,
  name: "Unit Name",
  stations: [
    {
      id: 2,
      name: "Sub-unit Name",
      devices: [
        {
          id: 3,
          name: "end device led 1",
        },
      ],
    },
  ],
};
```

**--> end\_device\_id là 3**

### **Bước 2: Gọi api lấy widget của end device 3:**

* URL: [https://backend.eoh.io/api/property\_manager/devices/3/display/](https://backend.eoh.io/api/property\_manager/devices/3/display/)
* RESPONSE\_DATA:

```
{
  items: [
    {
      id: 1,
      order: 0,
      template: "action",
      type: "action",
      configuration: {
        id: 103,
        template: "on_off_button_action_template",
        title: "",
        configuration: {
          action_on: "c163e4a9-79a6-4ae5-9dd9-c5cf8377d3e3",
          action_off: "dbd5b4d7-8c5c-485f-8aca-90474ffe9d84",
          icon_on: "PoweroffOutlined",
          icon_off: "PoweroffOutlined",
          config: 163,
          text_on: "ON",
          text_off: "OFF",
        },
      },
    },
  ],
};
```

&#x20;**--> action\_on key là c163e4a9-79a6-4ae5-9dd9-c5cf8377d3e3**

**--> action\_off key là dbd5b4d7-8c5c-485f-8aca-90474ffe9d84**

### **Bước 3: Gọi api điều khiển thiết bị và api lấy giá trị của datastream**

**- Gọi api điều khiển thiết bị**

* URL: [https://backend.eoh.io/api/chip\_manager/trigger\_action/](https://backend.eoh.io/api/chip\_manager/trigger\_action/)
* BODY:

```
{
key:  "c163e4a9-79a6-4ae5-9dd9-c5cf8377d3e3",
source: "internet"
}  
```

* RESPONSE\_DATA:

```
{
  result: "ok",
};
```

**- API Lấy giá trị của datastream**

* URL: [https://backend.eoh.io/api/chip\_manager/configs/163/current\_value/](https://backend.eoh.io/api/chip\_manager/configs/163/current\_value/)
* &#x20;RESPONSE\_DATA:&#x20;

```
{
  current_value_only: 1,
};
```
