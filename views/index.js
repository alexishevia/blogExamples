/** @jsx React.DOM */

define([
  'react',
  'underscore',
  'mixins/backbone_binding'
], function(React, _, BackboneBinding){

  var TABS = {
    latest: { text: 'Latest', url: '/?display=latest' },
    popular: { text: 'Most Popular', url: '/?display=popular' }
  };

  return React.createClass({
    displayName: 'Index',

    render: function(){
      return (
        <div>
          <div>
            { this.renderTab('latest') }
            { this.renderTab('popular') }
          </div>
          { this.renderPosts() }
        </div>
      );
    },

    renderTab: function(name){
      var attrs = TABS[name];

      var classes = "index__tab";
      if(this.props.display === name){
        classes += " index__tab--active";
      }

      return <a href={ attrs.url } onClick={_.partial(this.onClick, attrs.url)}
                className={ classes }>{attrs.text}</a>;
    },

    renderPosts: function(){
      return this.props.posts.map(function(post){
        var url = this.getPostUrl(post);
        return (
          <div className="index__post" key={post.id}>
            <a onClick={_.partial(this.onClick, url)} href={url}>
              {post.get('name')}
            </a>
          </div>
        );
      }, this);
    },

    getPostUrl: function(post){
      return this.props.getURL('show_post', { urlParams: {id: post.id} });
    },

    onClick: function(url, evt){
      evt.preventDefault();
      this.props.getURL(url, { pushState: true });
    },

    mixins: [
      new BackboneBinding({ model: 'posts', events: {
        'sync': 'onPostsChange'
      }})
    ],

    onPostsChange: function(){
      this.forceUpdate();
    }

  });

});

