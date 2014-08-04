/** @jsx React.DOM */

define([
  'react',
  'underscore'
], function(React, _){

  return React.createClass({
    displayName: 'Index',

    getInitialState: function(){
      var posts = {};
      if(this.props.posts && this.props.posts.toJSON){
        posts = this.props.posts.toJSON();
      }
      return { posts: posts };
    },

    render: function(){
      return (
        <div className="index">
          { this.renderPosts() }
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

