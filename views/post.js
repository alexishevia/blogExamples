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
    },

    renderPosts: function(){
      return _.map(this.state.posts, function(post){
        return  <div key={post.id}>
                  <a href={this.getPostUrl(post)}>{post.name}</a>
                </div>;
      }, this);
    },

    getPostUrl: function(post){
      return this.props.getURL('show_post', {id: post.id});
    }

  });

});


