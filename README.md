# 🛠 HƯỚNG DẪN CHẠY MÃ NGUỒN FRONT-END
Tải và cài đặt Node.js từ: [https://nodejs.org](https://nodejs.org)
Kiểm tra phiên bản đã cài:
```bash
node -v
npm -v
```
Tiếp theo, tại thư mục NoteWeb mở terminal và chạy lệnh sau trong terminal để cài đặt các package cần thiết:
```bash
npm install
```
Cuối cùng để chạy code bạn chạy lệnh sau trên terminal:
```bash
npm run dev
```

# 🛠 HƯỚNG DẪN CHẠY MÃ NGUỒN BACK-END VỚI DJANGO

## 1. Cài đặt Python và Django

Đầu tiên, đảm bảo rằng bạn đã cài đặt Python trên hệ thống. Bạn có thể kiểm tra phiên bản Python đã cài bằng lệnh:

```bash
python --version
```
## 2. Tạo và kích hoạt môi trường ảo
Trước khi cài đặt Django, bạn nên tạo một môi trường ảo để quản lý các gói cài đặt.
Chạy lệnh sau để tạo môi trường ảo:
```bash
python -m venv myenv
```
Kích hoạt môi trường ảo:
```bash
myenv\Scripts\activate
```
## 3. Cài đặt các gói cần thiết
Từ thư mục NoteAPI, mở terminal và chạy câu lệnh sau để cài đặt các thư viện cần thiết:
```bash
pip install -r requirements.txt
```
## 4. Migrate cơ sở dữ liệu
Trước khi chạy ứng dụng, bạn cần chạy lệnh migrate để tạo cơ sở dữ liệu:
```bash
python manage.py migrate
```
## 5. Chạy server Django
Sau khi hoàn thành các bước trên, bạn có thể chạy server Django bằng lệnh:
```bash
python manage.py runserver
```
# Lưu ý:
*Chạy cả 2 folder cùng lúc*
