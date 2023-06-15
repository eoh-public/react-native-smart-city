# MQTT Server integration

## API

**GATEWAY\_TOKEN** là mã định danh của mỗi gateway



**Create user**

_Tạo mqtt user và password._

```markup
URL: https://domain.com/api/user
METHOD: post

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = mqtt_api_key

BODY
{
   "username": GATEWAY_TOKEN,
   "password": GATEWAY_TOKEN,
}
```



**Create acl**

_Tạo quyền điều khiển ghi và đọc cho username với pattern là eoh/chip/GATEWAY\_TOKEN/# sẽ truy cập được toàn bộ thông tin của_ GATEWAY\_TOKEN _đó._

```
URL: https://domain.com/api/acl
METHOD: post

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = mqtt_api_key

BODY
{
    "username": GATEWAY_TOKEN,
    "pattern": "eoh/chip/GATEWAY_TOKEN/#",
    "read": true,
    "write": true
}
```



**Delete user**

_Xóa mqtt user_

```
URL: https://domain.com/api/user/GATEWAY_TOKEN
METHOD: delete

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = mqtt_api_key
```

