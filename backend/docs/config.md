# Cấu hình backend chuyển đổi type từ dạng CJS sang MJS
# Lưu ý việc chuyển đổi sẽ có khá nhiều khó khăn và sử dụng script chạy nên cân nhắc kỹ lưỡng
 -- Sau khi tạo backend project dự án sẽ nằm ở định dạng type là cjs
 -- Chúng ta cần cấu hình chuyển đổi thành mjs thực hiện tuần tự theo các bước
 -- Tôi sẽ cung cấp 2 dạng file script đặc biệt giúp hỗ trợ convert các file trong project 
    + convert-to-esm.js | add-js-extension.js
B1: Cài các gói cần thiết cài đặt thư viện cho script file
  + npm install glob fs   
  + npm install -g jscodeshift  
B2: Chạy file script convert-to-esm.js: node convert-to-esm.js

B3: Kiểm tra các file trong project đảm bảo đã convert đầy đủ thành dạng module
  * B3.1: Tại folder bin\www.js 
  -> điều chỉnh "var debug = require('debug')('backend:server');" thành:
    + import debug from 'debug';
    + const serverDebug = debug('backend:server');
  -> thay đổi "set('port', port);" -> "app.set('port', port);"
  * B3.2: Tại app.js thêm các import và const cần thiết cho việc đọc "__dirt":
    + import { fileURLToPath } from 'url';
    + const __filename = fileURLToPath(import.meta.url);
    + const __dirname = path.dirname(__filename);

B4: Tại package.json thêm cấu hình chuyển đổi type: "type": "module"

B5: Chạy file script add-js-extension.js: node add-js-extension.js

B6: Chạy: npm run start -> Kiểm tra có lỗi nào không và chạy được không.
----------------------------------------------------------------
# Cấu hình cài đặt nodemon 
* Sơ lược về nodemon:
    + Là gói chạy nodemon là gói giúp bạn chạy và lắng nghe sự thay đổi của source code theo thời gian mà không cần phải restart lại project.
* Hướng dẫn:
    B1: Cài đặt nodemon tại môi trường dev: npm i -D nodemon
    B2: Cấu hình nodemon run tại package.json dựa trên "start": "start:dev": "nodemon ./bin/www" 
    B3: Chạy: npm run start:dev | Kiểm tra và fix lỗi (nếu có).
