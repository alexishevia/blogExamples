define([
  'views/post',
  'models/post'
], function(PostView, PostModel){

  return {

    view: PostView,

    params: function(urlObj, getURL){

      var post = PostModel.create({ id: urlObj.id });

      return {
        getURL: getURL,
        post: post
      };

    },

    mustFetch: function(params){
      return ['post'];
    }

  };

});

