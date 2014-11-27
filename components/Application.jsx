'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var Home = require('./Home.jsx');
var About = require('./About.jsx');
var Nav = require('./Nav.jsx');
var FluxibleMixin = require('fluxible').Mixin;

var Application = React.createClass({
  mixins: [FluxibleMixin],
  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
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
