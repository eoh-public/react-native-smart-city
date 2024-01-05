# Day 2: giám sát dữ liệu với Tinker board



{% tabs %}
{% tab title="Make chip online" %}
#### Chạy code thông qua ssh

_thay **xxx** với **ip** tương ứng_

```
ssh linaro@xxx
cd era-lib/linux
```

_thay **TOKEN** với **gateway**_ _**token** tương ứng_

```
sudo ./era --token=TOKEN --host=mqtt1.eoh.io
```
{% endtab %}

{% tab title="Tinker nhận dữ liệu từ YoloUno và gửi lên E-Ra" %}
#### Code đọc dữ liệu từ YoloUno và gửi lên E-Ra, thông qua Virtual Pin V0 / V1 / V2.

{% file src="../.gitbook/assets/Tinker_2024.rar" %}

_Note: giải nén Tinker\_2024.rar_



#### Gửi file code vào Tinker board thông qua sftp

_thay **xxx** với **ip** tương ứng_

```
sftp linaro@xxx
lcd ~/Downloads/Tinker_2024
cd era-lib/linux
put main.cpp
put ERaConsole.h User/inc
put ERaConsole.cpp User/src
```



#### Chạy code thông qua ssh

_thay **xxx** với **ip** tương ứng_

```
ssh linaro@xxx
cd era-lib/linux
```

_build lại với đoạn code mới_

```
make clean all target=tinker
```

_thay **TOKEN** với **gateway token** tương ứng_

```
sudo ./era --token=TOKEN --host=mqtt1.eoh.io
```
{% endtab %}
{% endtabs %}









