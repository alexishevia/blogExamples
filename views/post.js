/** @jsx React.DOM */

define([
  'react'
], function(React){

  return React.createClass({
    displayName: 'Post',

    getInitialState: function(){
      var post = {};
      if(this.props.post && this.props.post.toJSON){
        post = this.props.post.toJSON();
      }
      return { post: post };
    },

    render: function(){
      return (
        <div className="post">
          <h1>{ this.state.post.name }</h1>
          <div>{ this.state.post.content }</div>
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


