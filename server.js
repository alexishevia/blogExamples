'use strict';
require('node-jsx').install({ extension: '.jsx' });
var express = require('express');
var navigateAction = require('flux-router-component').navigateAction;
var React = require('react');
var app = require('./app');
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));

var server = express();
server.use('/public', express.static(__dirname + '/build'));

var expressState = require('express-state');
expressState.extend(server);

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

    res.expose(app.dehydrate(context), 'App');

    var AppComponent = app.getAppComponent();
    var html = React.renderToStaticMarkup(HtmlComponent({
        state: res.locals.state,
        markup: React.renderToString(AppComponent({
            context: context.getComponentContext()
        }))
    }));

    res.send(html);
  });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
