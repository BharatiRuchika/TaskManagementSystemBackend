var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/tasks')
var jwt = require("jsonwebtoken")
require('dotenv').config({ path: './config/config.env' })
const connectDatabase = require("./config/database");
connectDatabase.connect();
var app = express();
app.use(cors());
// app.use(function (req, res, next) {
//   console.log("environment",process.env.NODE_ENV)
//   res.setHeader('Access-Control-Allow-Origin', "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type Accept');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use((req,res,next)=>{
  console.log("im here");
  
  const token = req.headers["auth-token"];
  console.log("token",token);
  console.log("token",token);
  if(token){
    console.log("im here also");
    try{
    req.user = jwt.verify(token,"GUvi!jdks");
    console.log(req.user);
    next();
    }catch(err){
      console.log("eroor",err)
      res.sendStatus(401);
    }
  }else{
    res.sendStatus(401);
  }
  
})
app.use('/tasks', taskRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3001,()=>{
   console.log("server started")
})
module.exports = app;
