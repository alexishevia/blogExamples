var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'foo',
});

app.get('/', function(req, res){
  res.writeHead(200, {
    'Transfer-Encoding': 'chunked',
    'Content-Type': 'text/plain; charset="utf-8'
  });

  res.write("Hello World!");
  res.write("\n\nNow connecting to mysql...");

  connection.connect(function(err) {
    if(err) {
      res.write("\n\nConnection failed");
    }
    else {
      res.write("\n\nConnection successful!");
    }
    res.end();
  });
});

app.listen(3000);
console.log('Listening on port 3000');
