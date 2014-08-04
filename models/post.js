define(['backbone', 'supermodel'], function(Backbone, Supermodel){

  return Supermodel.Model.extend({
    urlRoot: '/api/posts',
  });

});
