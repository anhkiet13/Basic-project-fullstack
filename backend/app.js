import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();
const PORT = process.env.PORT || 3000;

// Thực hiện CRUD basic
app.get('/', (req, res) => {
  res.status(200).send({ msg: "Hello" });
});

// Ta thường để /api/... để phù hợp hơn với môi trường phát triển
// Note thử vận dụng kiến thức cơ bản để tạo 1 basic CRUD (POST/PUT chưa hoàn thiện vì còn fix cứng)
// Đã xong phần học GET with query, GET with ID
// Tiếp đến POST 
const users = [
  { id: 1, username: "john", displayName: "John", isDelete: false },
  { id: 2, username: "ron", displayName: "Ron", isDelete: false },
  { id: 3, username: "tom", displayName: "Tom", isDelete: false },
  { id: 4, username: "aron", displayName: "Aron", isDelete: false },
  { id: 5, username: "dan", displayName: "Dan", isDelete: false },
  { id: 6, username: "billie", displayName: "Billie", isDelete: false },
];

// GET
app.get('/api/users', (req, res) => {
  console.log(req.query);
  const {query: {filter, type, value}} = req;

  if(!filter && !value)  return res.status(200).send(
    users.filter(user => !user.isDelete)
  ); 

  if(filter && value) {
    return res.send(users.filter(user => user[filter].includes(value) && !user.isDelete));
  }

  if(filter){
    switch(filter){
      case 'username':
        if(type && type == "desc")
          users.sort((a, b) => b.username.localeCompare(a.username));
        else 
          users.sort((a, b) => a.username.localeCompare(b.username));
      break;
      case 'displayName':
        if(type && type == "desc")
          users.sort((a, b) => b.displayName.localeCompare(a.displayName));
        else 
          users.sort((a, b) => a.displayName.localeCompare(b.displayName));
      break;
      default:
        break;
    }
  }

  // Trả về toàn bộ user bỏ các user đã bị delete
  let usersResponse = users.filter(user => !user.isDelete);

  // Kiểm tra dữ liệu và trả về response
  if(usersResponse.length == 0) 
    return res.status(404).send({msg:"User not found!"});
  return res.status(200).send(usersResponse);
});

// GET by ID
app.get('/api/users/:id', (req, res) => {
  const parseId = parseInt(req.params.id);

  if (isNaN(parseId))
    return res.status(400).send({ msg: "Bad Request, Invalid ID!" });

  const user = users.find(user => user.id === parseId);
  if (!user)
    return res.status(404).send({ msg: "Not found!" });
  return res.status(200).send(user);
});

// POST
app.post('/api/users', (req, res) => {
  const user = {
    id: users.length - 1,
    username: "new",
    displayName: "New User",
    isDelete: false,
  }
  users.push(user);
  res.status(200).send(users);
});
// DELETE | tương tự như PUT nhưng chỉ ở cấp độ cập nhật isDeleted ở đây
app.delete('/api/delete/users/:id', (req, res) => {
  const id = req.params.id;
  const userId = users.findIndex(user => user.id == id);
  console.log(userId);

  users[userId].isDelete = true;
  res.status(200).send(users.filter(user => !user.isDelete));
});

app.get('/api/products', (req, res) => {
  res.status(200).send([
    { id: 1, name: "Mazda CX5", price: "850.000.000" },
    { id: 2, name: "SamSung S7", displayName: "17.000.000" },
  ]);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Tạm thời chưa dùng router 
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use(bodyParser.json);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
