# Training 2: giám sát dữ liệu thông qua Tinker board



{% tabs %}
{% tab title="Source code" %}
#### Code đọc dữ liệu từ YoloUno và gửi lên E-Ra, thông qua Virtual Pin V0 / V1 / V2.

{% file src="../.gitbook/assets/Tinker_2024.rar" %}

_Note: giải nén Tinker\_2024.rar_



#### Gửi file code vào Tinker board thông qua sftp

thay **xxx** với **ip** tương ứng

```
sftp linaro@xxx
lcd ~/Downloads/Tinker_2024
cd era-lib/linux
put main.cpp
put ERaConsole.h User/inc
put ERaConsole.cpp User/src
```



#### Chạy code thông qua ssh

thay **xxx** với **ip** tương ứng

```
ssh linaro@xxx
cd era-lib/linux
make clean all target=tinker
```

```
sudo ./era --token=TOKEN --host=mqtt1.eoh.io
```
{% endtab %}
{% endtabs %}









