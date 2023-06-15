# MQTT Server integration

## API

**GATEWAY\_TOKEN** là mã định danh của mỗi gateway



<mark style="color:orange;">**Create user**</mark>

_Tạo mqtt user và password._

```markup
URL: https://domain.com/api/user
METHOD: post

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = MQTT_API_KEY

BODY
{
   "username": GATEWAY_TOKEN,
   "password": "password",
}
```



<mark style="color:orange;">**Create acl**</mark>

_Tạo quyền điều khiển ghi và đọc cho username với pattern là eoh/chip/GATEWAY\_TOKEN/# sẽ truy cập được toàn bộ thông tin của_ GATEWAY\_TOKEN _đó._

```
URL: https://domain.com/api/acl
METHOD: post

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = MQTT_API_KEY

BODY
{
    "username": GATEWAY_TOKEN,
    "pattern": "eoh/chip/GATEWAY_TOKEN/#",
    "read": true,
    "write": true
}
```



<mark style="color:orange;">**Delete user**</mark>

_Xóa mqtt user_

```
URL: https://domain.com/api/user/GATEWAY_TOKEN
METHOD: delete

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = MQTT_API_KEY
```

