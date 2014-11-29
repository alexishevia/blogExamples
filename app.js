'use strict';
var React = require('react');
var FluxibleApp = require('fluxible-app');
var routrPlugin = require('fluxible-plugin-routr');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new FluxibleApp({
    appComponent: React.createFactory(require('./components/Application.jsx'))
});

app.plug(routrPlugin({
    routes: require('./configs/routes')
}));

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

app.registerStore(require('./stores/TodoStore'));
app.registerStore(require('./stores/ApplicationStore'));

module.exports = app;
