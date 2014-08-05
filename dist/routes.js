/*-- routes.js --*/

define(function(){
  return {
    '/posts/{id}': 'show_post',
    '/about': 'about',
    '/{?display}': 'index'
  }
});
