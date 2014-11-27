'use strict';
var React = require('react');
var Home = require('./Home.jsx');
var About = require('./About.jsx');
var Nav = require('./Nav.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var FluxibleMixin = require('fluxible').Mixin;

var Application = React.createClass({
  mixins: [RouterMixin, FluxibleMixin],
  statics: {
      storeListeners: [ApplicationStore]
  },
  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },
  onChange: function () {
      var state = this.getStore(ApplicationStore).getState();
      this.setState(state);
  },
  render: function(){
    return (
      <div>
        <Nav selected={this.state.currentPageName} links={this.state.pages} context={this.props.context}/>
        {'home' === this.state.currentPageName ? <Home/> : <About/>}
      </div>
    );
  }
});

module.exports = Application;
