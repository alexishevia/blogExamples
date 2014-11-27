'use strict';
require('node-jsx').install({ extension: '.jsx' });
var express = require('express');
var server = express();
var port = process.env.PORT || 3000;
var navigateAction = require('flux-router-component').navigateAction;
var React = require('react');
var app = require('./app');
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));

server.use(function(req, res, next) {
  var context = app.createContext();

  context.getActionContext().executeAction(navigateAction, {
    path: req.path
  }, function (err) {
    if (err) {
      if (err.status && err.status === 404) {
        next();
      } else {
        next(err);
      }
      return;
    }

    var AppComponent = app.getAppComponent();
    var html = React.renderToStaticMarkup(HtmlComponent({
        markup: React.renderToString(AppComponent({
            context: context.getComponentContext()
        }))
    }));

    res.send(html);
  });
});

server.listen(port);
console.log('Listening on port ' + port);
