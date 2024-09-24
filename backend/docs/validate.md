# Chúng ta sẽ thực hiện cài đặt validation packet cho ứng dụng
- B1: Cài đặt gói express-validation
    npm install express-validator

- B2: Tạo một folder "validations" dùng để chứa các validation cho các controller
  + Thực hiện tạo một function validate cho controller tương ứng. (validation-user.js) 
  + Flow validate sẽ tương tự như C# mà chúng ta đã làm:
        User -> Controller -> Validation -> model
  + Như chúng ta thấy flow dữ liệu sẽ phải đi qua validator trước khi vào module
  + Trong ví dụ ở P1 ngày 24/9 => Controller, module đang đặt chung tại (app.js)

- B3: Ví dụ việc lấy dữ liệu messages trả về khi lỗi validate tại (app.js).