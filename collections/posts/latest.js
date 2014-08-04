define(['backbone'], function(Backbone){
  var Collection = Backbone.Collection.extend({
    url: '/api/posts?filter=latest'
  });

  var collection = new Collection();

  return function(){
    return collection;
  }

});
