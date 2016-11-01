'use strict';

var path = require('path');

/*
 * On production, a .env file is created from .env.yml and parsed by dotenv.
 * For development, we just extend process.env manually
 */
if(process.env.NODE_ENV === 'development'){
  const YAML = require('yamljs')
  const config = YAML.load(path.join(__dirname, '.env.yml'))
  Object.assign(process.env, config.development)
}
else {
  require('dotenv').config()
}

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var massive = require("massive");

var app = express();

app.set('db', massive.connectSync({
  connectionString : process.env.DATABASE_URL
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', require('./routes/users'));
app.use('/todos', require('./routes/todos'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
