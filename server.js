var express = require('express');
var server = express();
var port = process.env.PORT || 3000;

require('node-jsx').install({ extension: '.jsx' });
var React = require('react');
var AppComponent = React.createFactory(require('./components/Application.jsx'));

server.use(function(req, res, next) {
  var component = AppComponent();
  var html = React.renderToString(component);
  res.send(html);
});

server.listen(port);
console.log('Listening on port ' + port);
