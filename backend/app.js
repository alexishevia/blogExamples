var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var app = express();

var allowedOrigins = ['http://someorigin.com',
                      'http://anotherorigin.com',
                      'http://localhost:9080'];

app.use(cors({

  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },

  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],

  credentials: true,
}));

app.use(cookieParser());

app.use('/', function(req, res){
  console.log(req.cookies);
  res.setHeader('X-Foo', 'bar');
  res.cookie('sessionID', '12345', {
    httpOnly: true,
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
  });
  res.json({ msg: 'Hello World' });
});

module.exports = app;
