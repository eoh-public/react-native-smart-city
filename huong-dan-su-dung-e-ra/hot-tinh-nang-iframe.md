---
description: New Update 07/2024
---

# \*HOT\* Tính Năng iFrame

## Hướng dẫn Tính năng iFrame

_**B1: Đăng nhập tài khoản Github tại:**_ https://[github.com](https://github.com)

<figure><img src="../.gitbook/assets/image (383).png" alt=""><figcaption></figcaption></figure>

_**B2: Tạo một Repository mới**_

\- Click chọn biểu tượng account góc phải trên cùng -> chọn Your repositories -> New.

<figure><img src="../.gitbook/assets/image (384).png" alt=""><figcaption></figcaption></figure>

\- Tiếp đến, điền Repository name\*, Description (optional) chọn Public, tick chọn Add a README file -> Create repository.

<figure><img src="../.gitbook/assets/image (385).png" alt=""><figcaption></figcaption></figure>

_**B3: Tạo một 1 file trạng thái công tắc switch.html**_

_<mark style="background-color:orange;">(có thể tìm thêm các nguồn source code hoặc chỉnh sửa file code để có kết quả mong muốn)</mark>_

\- Tạo 1 Text Document mới: File Explorer-> vào folder Document (hoặc folder bất kỳ) -> Click chuột phải  -> New-> Text Document -> thêm code công tắc vào file và lưu lại với tên và đuôi mở rộng như sau: switch.html.

<figure><img src="../.gitbook/assets/image (386).png" alt=""><figcaption></figcaption></figure>

\- Code:

```
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
 
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
 
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
 
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
 
input:checked + .slider {
  background-color: #2196F3;
}
 
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
 
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
 
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
 
.slider.round:before {
  border-radius: 50%;
}
</style>
</head>
<body>
 
<label class="switch">
  <input type="checkbox" id="the_switch">
  <span class="slider round"></span>
</label>
<script src="https://www.unpkg.com/@eohjsc/era-widget@1.0.14/src/index.js"></script>
<script>
  const eraWidget = new EraWidget();
  let config = null;
  eraWidget.onConfiguration((configuration) => {
    config = configuration.realtime_configs[0];
  })
  eraWidget.onValues((values) => {
    const input = document.getElementById('the_switch');
    input.checked = values[config.id].value;
  });
  eraWidget.ready()
</script>
</body>
</html>
```



_**B4: Đưa File công tắc lên github (sử dùng Public)**_

\- Ở trang Era-Widget -> Add file -> Upload files -> kéo thả file công tắc đã tạo ở B3 vào -> Commit changes.

<figure><img src="../.gitbook/assets/image (387).png" alt=""><figcaption></figcaption></figure>

_**B5: Enable Github Page**_

\- Mục Settings -> chọn Pages -> trang GitHub Pages xuất hiện.

<figure><img src="../.gitbook/assets/image (388).png" alt=""><figcaption></figcaption></figure>

\- Trong trang GitHub Pages -> phần Source chọn GitHub Actions -> phần GitHub Pages JekyII chọn Configure -> chọn Commt changes… -> Popup Commit changes xuất hiện -> chọn Commit changes -> đợi quá trình hoàn thành sẽ có dấu tick xanh lá.

<figure><img src="../.gitbook/assets/image (389).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (390).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (391).png" alt=""><figcaption></figcaption></figure>

_**B6: Truy cập trang nút nhấn vừa tạo**_

\- Mục Actions -> Click chọn Create jekyll-gh-pages.yml -> ở deploy click chọn đường link bên dưới -> Tab mới xuất hiện với đường link: [https://thao-eoh.github.io/ERa-Widget/](https://thao-eoh.github.io/ERa-Widget/) -> thêm tên công tắc switch.html đã thêm vào github như sau: [https://thao-eoh.github.io/ERa-Widget/switch.html](https://thao-eoh.github.io/ERa-Widget/switch.html) -> kết quả được một nút nhấn thay đổi trạng thái.

<figure><img src="../.gitbook/assets/image (392).png" alt=""><figcaption></figcaption></figure>

_**B7: Cấu hình cập nhật trạng thái công tắc iFrame**_

\-Dashboard Units -> Hướng dẫn sử dụng E-Ra -> Edit Dashboard -> menu Widget Box bên trái phía dưới cùng -> click kéo thả IFrame With ConFig ra trang Dashboard.

<figure><img src="../.gitbook/assets/image (393).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (394).png" alt=""><figcaption></figcaption></figure>

\- Click chọn biểu tượng bánh răng (setting widget) bên góc phải trên cùng widget iFrame With ConFig -> cấu hình như hình -> OK.

<figure><img src="../.gitbook/assets/image (395).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (396).png" alt=""><figcaption></figcaption></figure>

\- Chọn Done -> Xem kết quả cập nhật trạng thái sau khi điều khiển nút nhấn.

<figure><img src="../.gitbook/assets/image (397).png" alt=""><figcaption></figcaption></figure>
