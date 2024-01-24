# Một số lưu ý khi build code trên ASUS Tinker Board

1. Chương trình chính nằm ở file <mark style="color:red;">"</mark><mark style="color:red;">**main.cpp"**</mark> trong thư mục:

```
~/era-lib/linux
```

2. Thư viện bổ trợ cần được thêm vào thư mục sau:

* Với file header (\*.h, \*.hpp)

```
~/era-lib/linux/User/inc
```

* Với file source (\*.c, \*.cpp)

```
~/era-lib/linux/User/src
```

3. Để build E-Ra trên ASUS Tinker Board cần đưa con trỏ về thư mục:

```
~/era-lib/linux
```

Sau đấy dùng lệnh sau để build chương trình:

```
make clean all target=tinker
```
