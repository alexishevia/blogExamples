/** @jsx React.DOM */

define([
  'react',
  'underscore'
], function(React, _){

  return function(options){
    if(!options || !options.model || !options.events){
      throw 'options.model and options.events are required';
    }

    return {
      componentDidMount: function(){
        this.bindToEvents(this.props[options.model]);
      },

      componentWillUnmount: function(){
        this.unbindFromEvents(this.props[options.model]);
      },

      componentWillReceiveProps: function(nextProps){
        if(options['componentWillReceiveProps:before']){
          options['componentWillReceiveProps:before'].call(this, nextProps);
        }

        if(nextProps[options.model] &&
           nextProps[options.model] !== this.props[options.model])
        {
          this.unbindFromEvents(this.props[options.model]);
          this.bindToEvents(nextProps[options.model]);
        }

        if(options['componentWillReceiveProps:after']){
          options['componentWillReceiveProps:after'].call(this, nextProps);
        }
      },

      bindToEvents: function(model){
        _.each(options.events, function(cb, evt){
          model.on(evt, this[cb], this);
        }, this);
      },

      unbindFromEvents: function(model){
        model.off(null, null, this);
      }
    }
  };

});
