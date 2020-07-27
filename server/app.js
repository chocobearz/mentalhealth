var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser=require('body-parser');
const cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ,
  ssl: {
    rejectUnauthorized: false
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'build')));

require('./routes/journal.js')(app);

var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/favicon.png'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


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

module.exports = app;
