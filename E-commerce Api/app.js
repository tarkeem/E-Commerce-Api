var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv=require('dotenv')
dotenv.config()
//to run the server npm run start:dev

errorMidlleWare=require('./middlewares/errorMiddleware')
errorMidlleWare=require('./middlewares/errorMiddleware')
dbConnect=require('./config/mongodb')
var index = require('./routers/index');
const ApiError = require('./utilits/ApiError');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dbConnect


index(app)
app.all('*',(req,res,next)=>{
  next(new ApiError("Not Found Route !!",404))
})
app.use(errorMidlleWare)


process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});

module.exports = app;

