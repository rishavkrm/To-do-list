const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const listRouter = require('./routers/listRouter')
const userRouter = require('./routers/userRouter')
const cookieParser = require('cookie-parser')
app.use(cookieParser());
const globalErrorHandler = require('./controller/errorController');

const AppError = require('./utils/appError');

app.set("view engine","ejs");
app.use(express.static("public"));

app.use('/',listRouter)
app.use('/user',userRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
