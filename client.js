'use strict';
var React = require('react');
var app = require('./app');
var dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    var mountNode = document.getElementById('app');

    React.render(app.getAppComponent()({
        context: context.getComponentContext()
    }), mountNode);
});
