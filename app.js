var createError = require('http-errors');
var express = require('express');
var session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var studentsRouter = require('./routes/students');
var authRouter = require('./routes/auth');
var resultsPage = require('./routes/resultsPage');
var indexRouter = require('./routes');
var staffRouter = require('./routes/staff');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static('public'));
// app.use('/images', express.static('public'));




app.use('/students', studentsRouter);
app.use('/auth', authRouter);
app.use('/results',resultsPage);
app.use('/',indexRouter);
app.use('/staff',staffRouter);

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

const sessionOptions = require('./session');
app.use(session(sessionOptions))

module.exports = app;
