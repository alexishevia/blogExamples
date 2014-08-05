/*-- routes.js --*/

define(function(){
  return {
    '/posts/{id}': 'show_post',
    '/{?display}': 'index'
  }
});
