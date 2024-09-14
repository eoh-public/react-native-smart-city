---
description: New Update 07/2024
---

# \*HOT\* Tính Năng iFrame

Dưới đây là phiên bản được chỉnh sửa để nội dung dễ hiểu và chuyên nghiệp hơn:

***

### Hướng dẫn sử dụng tính năng iFrame

#### Bước 1: Đăng nhập vào tài khoản GitHub

Truy cập vào [GitHub](https://github.com/) và đăng nhập bằng tài khoản của bạn.

#### Bước 2: Tạo một Repository mới

* Truy cập vào [GitHub Repository](https://github.com/new) để tạo một repository mới.
* Điền thông tin:
  * **Repository name** (tên repository) _bắt buộc_.
  * **Description** (mô tả) _tùy chọn_.
  * Chọn **Public**.
  * Chọn **Add a README file**.
  * Nhấn **Create repository** để hoàn tất.

<figure><img src="../.gitbook/assets/Screenshot 2024-09-14 at 21.01.47.png" alt=""><figcaption></figcaption></figure>

#### Bước 3: Tạo file HTML

* Tạo một file HTML có tên là `switch.html` với nội dung sau:

````html
```html
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
        }
        .container {
            width: 400px;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }

        /* The switch - the box around the slider */
        .switch {
            font-size: 17px;
            position: relative;
            display: inline-block;
            width: 5em;
            height: 2.5em;
            user-select: none;
        }

        /* Hide default HTML checkbox */
        .switch .cb {
            opacity: 0;
            width: 0;
            height: 0;
        }

        /* The slider */
        .toggle {
            position: absolute;
            cursor: pointer;
            width: 100%;
            height: 100%;
            background-color: #373737;
            border-radius: 0.1em;
            transition: 0.4s;
            text-transform: uppercase;
            font-weight: 700;
            overflow: hidden;
            box-shadow: -0.3em 0 0 0 #373737, -0.3em 0.3em 0 0 #373737,
                0.3em 0 0 0 #373737, 0.3em 0.3em 0 0 #373737, 0 0.3em 0 0 #373737;
        }

        .toggle>.left {
            position: absolute;
            display: flex;
            width: 50%;
            height: 88%;
            background-color: #f3f3f3;
            color: #373737;
            left: 0;
            bottom: 0;
            align-items: center;
            justify-content: center;
            transform-origin: right;
            transform: rotateX(10deg);
            transform-style: preserve-3d;
            transition: all 150ms;
        }

        .left::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgb(206, 206, 206);
            transform-origin: center left;
            transform: rotateY(90deg);
        }

        .left::after {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgb(112, 112, 112);
            transform-origin: center bottom;
            transform: rotateX(90deg);
        }

        .toggle>.right {
            position: absolute;
            display: flex;
            width: 50%;
            height: 88%;
            background-color: #f3f3f3;
            color: rgb(206, 206, 206);
            right: 1px;
            bottom: 0;
            align-items: center;
            justify-content: center;
            transform-origin: left;
            transform: rotateX(10deg) rotateY(-45deg);
            transform-style: preserve-3d;
            transition: all 150ms;
        }

        .right::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgb(206, 206, 206);
            transform-origin: center right;
            transform: rotateY(-90deg);
        }

        .right::after {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgb(112, 112, 112);
            transform-origin: center bottom;
            transform: rotateX(90deg);
        }

        .switch input:checked+.toggle>.left {
            transform: rotateX(10deg) rotateY(45deg);
            color: rgb(206, 206, 206);
        }

        .switch input:checked+.toggle>.right {
            transform: rotateX(10deg) rotateY(0deg);
            color: #487bdb;
        }
    </style>
</head>

<body>
    <div class="container">
        <label class="switch">
            <input id="the_switch" class="cb" type="checkbox" />
            <span class="toggle">
                <span class="left">off</span>
                <span class="right">on</span>
            </span>
        </label>
    </div>
    <script src="https://www.unpkg.com/@eohjsc/era-widget@1.1.3/src/index.js"></script>
    <script>
        const theSwitch = document.getElementById('the_switch');
        let configLed = null, newStatusLed = null, actions = [];

        const eraWidget = new EraWidget();
        eraWidget.init({
            needRealtimeConfigs: true,
            needHistoryConfigs: true,
            needActions: true,
            maxRealtimeConfigsCount: 3,
            maxHistoryConfigsCount: 1,
            maxActionsCount: 2,
            minRealtimeConfigsCount: 0,
            minHistoryConfigsCount: 0,
            minActionsCount: 0,
            onConfiguration: (configuration) => {
                // console.log('configuration', configuration) // Use console.log when you need to debug
                configLed = configuration.realtime_configs[0];
                actions = configuration.actions;
            },
            onValues: (values) => {
                // console.log('values', values) // Use console.log when you need to debug
                const stateLed = values[configLed.id].value;
                if (newStatusLed !== stateLed) {
                    newStatusLed = stateLed;
                    theSwitch.checked = stateLed;
                }
            },
        });

        // Trigger actions based on the switch state
        theSwitch.addEventListener('click', () => {
            if (newStatusLed === 1) {
                eraWidget.triggerAction(actions[1]?.action, null); // Trigger 'Off' action
            } else {
                eraWidget.triggerAction(actions[0]?.action, null); // Trigger 'On' action
            }
        });
    </script>
</body>

</html>
```
````



#### Bước 4: Đưa file lên GitHub

\- Tải file `switch.html` lên repository mà bạn vừa tạo.

Ở trang Era-Widget -> Add file -> Upload files -> kéo thả file công tắc đã tạo ở B3 vào -> Commit changes.

<figure><img src="../.gitbook/assets/image (387).png" alt=""><figcaption></figcaption></figure>

#### Bước 5: Kích hoạt GitHub Pages

* Vào **Settings** của repository, sau đó chọn **Pages**.
* Trong trang **GitHub Pages**, tìm đến mục **Source**, chọn **GitHub Actions**.
* Tại mục **GitHub Pages Jekyll**, nhấn **Configure**, sau đó nhấn **Commit changes**.
* Đợi quá trình hoàn tất cho đến khi xuất hiện dấu tick xanh.

<figure><img src="../.gitbook/assets/image (388).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (389).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (390).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (391).png" alt=""><figcaption></figcaption></figure>

#### Bước 6: Truy cập trang với nút điều khiển

* Vào mục **Actions**, chọn **Create jekyll-gh-pages.yml**.
* Ở phần deploy, nhấn vào đường link được tạo dưới phần **deploy**. Một tab mới sẽ mở ra với đường dẫn dạng: `https://thao-eoh.github.io/ERa-Widget/`.
* Thêm tên file `switch.html` vào sau đường dẫn: `https://thao-eoh.github.io/ERa-Widget/switch.html`.
* Bạn sẽ thấy một trang chứa nút nhấn có thể thay đổi trạng thái.

<figure><img src="../.gitbook/assets/image (392).png" alt=""><figcaption></figcaption></figure>

#### Bước 7: Cấu hình cập nhật trạng thái nút nhấn qua iFrame

* Truy cập vào **Dashboard Units** và chọn Unit của bạn.
* Nhấn **Edit Dashboard**.
* Ở phần **Widget Box** (nằm ở cuối cùng bên trái), kéo và thả widget **iFrame With Config** vào Dashboard.
* Nhấn vào biểu tượng bánh răng ở góc phải trên của widget **iFrame With Config** để cấu hình theo yêu cầu.
* Nhấn **OK** sau khi cấu hình xong.
* Cuối cùng, nhấn **Done** và kiểm tra kết quả sau khi điều khiển nút nhấn.

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

\- Click chọn biểu tượng bánh răng (setting widget) bên góc phải trên cùng widget iFrame With ConFig -> cấu hình như hình -> OK.

<figure><img src="../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

\- Chọn Done -> Xem kết quả cập nhật trạng thái sau khi điều khiển nút nhấn.

<figure><img src="../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>
