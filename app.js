'use strict';
var React = require('react');
var Fluxible = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
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
