/** @jsx React.DOM */

define([
  'react',
  'mixins/backbone_binding'
], function(React, BackboneBinding){

  return React.createClass({
    displayName: 'Post',

    mixins: [
      new BackboneBinding({ model: 'post', events: {
        'change': 'onPostChange'
      }})
    ],

    onPostChange: function(){
      this.forceUpdate();
    },

    render: function(){
      return (
        <div className="post">
          <h1>{ this.props.post.get('name') }</h1>
          <div>{ this.props.post.get('content') }</div>
        </div>
      )
    }

  });

});
