# MicroPython

**1 . Tải và cài đặt MicroPython lên ESP32**

* Truy cập vào [Link github](../../../) và tiến hành tải firmware ERa MicroPython cho ESP32

<figure><img src="../../../.gitbook/assets/image (406).png" alt=""><figcaption><p>Download firmware MicroPython</p></figcaption></figure>

* Cài esptool của ESP-IDF theo [Link hướng dẫn](https://docs.espressif.com/projects/esptool/en/latest/esp32/)
* Tiến hành Flash firmware xuống ESP32 bằng lệnh sau

```bash
esptool.py --baud 460800 write_flash --erase-all 0x0 ERa-MicroPython-Generic-ESP32-4MB.bin
```

**2 . API giao tiếp với ERa trong MicroPython**

* Import thư viện ERa trên MicroPython

```python
from era import ERa
from era import WiFi
```

* Khai báo thư viện ERa và WiFi

<pre class="language-python"><code class="lang-python">ERA_AUTH = "ERA2706"

WIFI_SSID = "YOUR_SSID"
WIFI_PASS = "YOUR_PASSWORD"

<strong># Khai báo thư viện ERa với Token ERA_AUTH
</strong>era = ERa(ERA_AUTH)
# Khai báo WiFi với tên WiFi WIFI_SSID và password WIFI_PASS
wifi = WiFi(WIFI_SSID, WIFI_PASS)
</code></pre>

* Đăng ký hàm callback để nhận lệnh điều khiển từ ERa

```python
# Đăng ký callback nhận lệnh điều khiển từ ERa với chân V0
@era.register_handler("write v0")
def era_write_v0_handler(pin, value):
    # Gửi giá trị V0 vừa nhận được lên ERa
    era.virtual_write(pin, state)
    print(f'Virtual pin {pin} value {value}')
```

* Đăng ký timer để gửi data lên ERa với tần suất cố định

<pre class="language-python"><code class="lang-python"><strong># Đăng ký timer tần suất 1s
</strong>@era.register_timer(interval = 1)
def write_to_era():
    uptime = time.time()
    # Gửi thời gian Uptime lên chân V1 ERa
    era.virtual_write(1, uptime)
    print(f'Uptime {uptime}')
</code></pre>

**3 . Examples**

```python
import random
import utime as time
from machine import Pin
from era import ERa
from era import WiFi

# Mã Token ERa
ERA_AUTH = "ERA2706"

# WiFi
WIFI_SSID = "YOUR_SSID"
WIFI_PASS = "YOUR_PASSWORD"

# Khai báo thư viện ERa với Token ERA_AUTH
era = ERa(ERA_AUTH)
# Khai báo WiFi với tên WiFi WIFI_SSID và password WIFI_PASS
wifi = WiFi(WIFI_SSID, WIFI_PASS)

# Khai báo LED với GPIO 2
led = Pin(2, Pin.OUT, value = 1)

# Đăng ký callback nhận lệnh điều khiển từ ERa với chân V0
@era.register_handler("write v0")
def era_write_v0_handler(pin, value):
    # Điều khiển LED với giá trị V0 vừa nhận được
    led.value(value)
    # Gửi giá trị V0 vừa nhận được lên ERa
    era.virtual_write(pin, value)
    print(f'Virtual pin {pin} value {value}')

@era.register_handler("connect")
def connect_handler(info):
    info["ip"] = wifi.localIP()
    info["rssi"] = wifi.RSSI()
    print("Connected")

# Đăng ký timer tần suất 1s
@era.register_timer(interval = 1)
def write_to_era():
    uptime = time.time()
    # Gửi thời gian Uptime lên chân V1 ERa
    era.virtual_write(1, uptime)
    print(f'Uptime {uptime}')

while True:
    wifi.run()
    era.run()
```
