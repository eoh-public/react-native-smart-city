# Public API ERa hỗ trợ

**Ghi chú**

* Trigger action chỉ dành cho các widget là action
* Response data sẽ trả nhiều field hơn so với những ví dụ, cho nên chỉ tập trung nhưng field ví dụ.

## 1. Hướng dẫn lấy Token

**Bước 1:** Đăng nhập app.e-ra.io

**Bước 2:** Chọn profile

![](.gitbook/assets/image.png)

**Bước 3:** Copy Auth Token

![](<.gitbook/assets/image (1).png>)

## 2. Danh sách API:&#x20;

### **2.1. API lấy unit của user:**

* URL: [https://backend.eoh.io/api/property\_manager/units/mine/](https://backend.eoh.io/api/property\_manager/units/mine/)
* METHOD: **GET**
* HEADERS: {**Authorization: Token**}
* RESPONS\_STATUS\_CODE: 200
* RESPONSE\_DATA:

```
{
  id: unit_id,
  name: "Unit Name",
  stations: [
    {
      id: subunit_id,
      name: "Sub-unit Name",
      devices: [
        {
          id: end_device_id,
          name: "end device led 1",
        },
      ],
    },
  ],
}
```

<mark style="color:red;">--></mark> <mark style="color:red;"></mark><mark style="color:red;">**Lấy end\_device\_id**</mark>

### **2.2. API lấy widget dựa vào end device id**

* URL: [https://backend.eoh.io/api/property\_manager/devices/\<end\_device\_id>/display/](https://backend.eoh.io/api/property\_manager/devices/%3Cend\_device\_id%3E/display/)
* METHOD: **GET**
* HEADERS: {**Authorization: Token**}
* RESPONS\_STATUS\_CODE: 200
* RESPONSE\_DATA

```
{
  Items: [
    {
      id: widget_id,
      order: 0,
      template: "action",
      type: "action",
      configuration: {
        id: action_display_id,
        template: "on_off_button_action_template",
        title: "",
        configuration: {
          action_on: "key_on",
          action_off: "key_off",
          text_on: "ON",
          text_off: "OFF",
        },
      },
    },
  ];
}
```

<mark style="color:red;">--></mark> <mark style="color:red;"></mark><mark style="color:red;">**Lấy action\_on hoặc action off**</mark>

### **2.3. API điều khiển thiết bị dựa vào action key**

* URL: [https://backend.eoh.io/api/chip\_manager/trigger\_action/](https://backend.eoh.io/api/chip\_manager/trigger\_action/)
* METHOD: POST
* &#x20; BODY: &#x20;

```
{
"key": "key_on",
"source": "internet"
}

```

* HEADERS: {**Authorization: Token**}
* RESPONS\_STATUS\_CODE: 200
* RESPONSE\_DATA: &#x20;

```
{
  result: "ok",
};
```

### 2.4. API Lấy giá trị của datastream

* &#x20;URL: [https://backend.eoh.io/api/chip\_manager/configs/\<config\_id>/current\_value/](https://backend.eoh.io/api/chip\_manager/configs/%3Cconfig\_id%3E/current\_value/)
* METHOD: GET
* HEADERS: {Authorization: Token}
* RESPONS\_STATUS\_CODE: 200
* RESPONSE\_DATA:&#x20;

```
{
  current_value_only: 0,
};
```

## &#x20;3. Ví dụ

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
