# Day 2: giám sát dữ liệu với Tinker board

1. Tìm địa chỉ ip và token Tinker board
2. Online Tinker board thông qua ssh
3. Cập nhật code mới, gửi dữ liệu lên E-Ra

\-----------------------------------------------------



**1. Tìm địa chỉ ip và token Tinker board**

**Tìm IP:** \
_Khởi động <mark style="color:orange;">**Tinker**</mark>, mở <mark style="color:orange;">**LXTerminal**</mark> (<mark style="color:orange;">Start menu</mark> > <mark style="color:orange;">System Tools</mark> > <mark style="color:orange;">LXTerminal</mark>) và_ _<mark style="color:orange;">**copy / paste lệnh**</mark>_

```
sudo ifconfig wlan0
```

**Tìm Token:**\
_Vào web_ _<mark style="color:orange;">**https://app.e-ra.io/dev-mode/gateways**</mark> >_ _<mark style="color:orange;">**Gateway của mình**</mark>_ _>_ _<mark style="color:orange;">**Copy authtoken**</mark>_



{% tabs %}
{% tab title="2. Online Tinker (ssh)" %}
```
ssh linaro@<ip>
```

```
cd era-lib/linux
```

```
sudo ./era --token=<token> --host=mqtt1.eoh.io
```

* Mở <mark style="color:orange;">**Terminal**</mark> trên <mark style="color:orange;">**laptop**</mark>
* <mark style="color:orange;">**Copy / paste**</mark> từng <mark style="color:orange;">**lệnh**</mark>
* Thay <mark style="color:orange;">**ip**</mark> và <mark style="color:orange;">**token**</mark> tương ứng



_<mark style="color:orange;">**Ví dụ:**</mark>_

```
ssh linaro@<ip>
ssh linaro@192.168.1.2
```

```
sudo ./era --token=<token> --host=mqtt1.eoh.io
sudo ./era --token=111111-1111-1111-1111-11111111 --host=mqtt1.eoh.io
```
{% endtab %}

{% tab title="3. Code chuẩn bị sẵn và Online Tinker" %}
Code đọc dữ liệu từ <mark style="color:orange;">**YoloUno**</mark> và <mark style="color:orange;">**gửi lên E-Ra**</mark>, thông qua <mark style="color:orange;">**Virtual**</mark> <mark style="color:orange;">**Pin**</mark> V0, V1, V2

_tải và giải nén Tinker\_2024.rar, được thư mục <mark style="color:orange;">Tinker\_2024</mark>_

{% file src="../.gitbook/assets/Tinker_2024.rar" %}



#### Cập nhật <mark style="color:orange;">code mới</mark> vào <mark style="color:orange;">Tinker</mark> thông qua <mark style="color:orange;">sftp</mark>

```
sftp linaro@<ip>
```

_Thay <mark style="color:orange;">đường dẫn</mark> đến thư mục <mark style="color:orange;">Tinker\_2024</mark> tương ứng trên máy_

{% code overflow="wrap" %}
```
lcd ~/Downloads/Tinker_2024
cd era-lib/linux
put main.cpp
put ERaConsole.h User/inc
put ERaConsole.cpp User/src
```
{% endcode %}

Thoát <mark style="color:orange;">**sftp.**</mark>



#### <mark style="color:orange;">Online Tinker</mark> thông qua <mark style="color:orange;">ssh</mark>

<pre><code>ssh linaro@<a data-footnote-ref href="#user-content-fn-1">&#x3C;ip></a>
</code></pre>

<mark style="color:orange;">**build**</mark> <mark style="color:orange;">**code mới**</mark>

```
cd era-lib/linux
make clean all target=tinker
```

```
sudo ./era --token=<token> --host=mqtt1.eoh.io
```
{% endtab %}
{% endtabs %}



[^1]: 
