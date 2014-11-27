'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var Home = require('./Home.jsx');
var About = require('./About.jsx');
var StoreMixin = require('fluxible-app').StoreMixin;

var Application = React.createClass({
  mixins: [StoreMixin],
  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },
  render: function(){
    return (
      <div>
        {'home' === this.state.currentPageName ? <Home/> : <About/>}
      </div>
    );
  }
});

module.exports = Application;
