# MQTT Server integration

## API

**Create user**

```markup
URL: http://domain.com/api/user
METHOD: post

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = mqtt_api_key

BODY
{
   "username": IMEI,
   "password": IMEI,
}
```



**Create acl**

```
URL: http://domain.com/api/acl
METHOD: post

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = mqtt_api_key

BODY
{
    "username": IMEI,
    "pattern": "eoh/chip/IMEI/#",
    "read": true,
    "write": true
}
```



**Delete user**

```
URL: http://domain.com/api/user/IMEI
METHOD: delete

HEADER
- Content-Type: application/json
- Authorization: Basic Auth
  username: ""
  password = mqtt_api_key
```

