define([
  'views/index',
  'collections/posts/latest',
  'collections/posts/most_popular'
], function(IndexView, LatestPosts, MostPopularPosts){

  return {

    // 1. which view to render
    view: IndexView,

    // 2. which params to pass to the view
    params: function(urlObj, getURL){

      // urlObj contains the parsed route
      // if no display param was sent, we'll display the latest posts.
      var display = urlObj.display || 'latest';

      // the collection to use depends on the display param
      var collection = {
        latest: LatestPosts,
        popular: MostPopularPosts
      }[display];

      // these are the params sent to the view
      return {
        getURL: getURL,
        display: display,
        posts: new collection()
      };

    },

    // 3. which data to fetch from the datastore
    mustFetch: function(params){
      return ['posts'];
    }

  };

});
