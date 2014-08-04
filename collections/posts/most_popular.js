define(['backbone'], function(Backbone){
  var Collection = Backbone.Collection.extend({
    url: '/api/posts?filter=popular'
  });

  var collection = new Collection();

  return function(){
    return collection;
  }

});

