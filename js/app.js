define([
  'underscore', 'jquery', 'organization_data'
], function(_, $, data){

  var App = function(el){
    this.$el = $(el);

    // display as a list by default
    this.display = 'list';

    // listen for link clicks, and update the `display` value accordingly
    this.$el.on('click', '.display-options a', _.bind(function(evt){
      evt.preventDefault();
      this.display = $(evt.currentTarget).attr('href').replace('#', '');
      this.render();
    }, this));
  };

  App.prototype.render = function(){
    this.$el.html(
      '<div class="display-options">' +
        '<div><a href="#list">Display employee list</a></div>' +
        '<div><a href="#chart">Display organizational chart</a></div>' +
      '</div>');
     this.renderContent();
  };

  App.prototype.renderContent = function(){
    // dynamically load renderer
    require([ 'renderers/' + this.display ], _.bind(function(renderer){
      this.$el.append(renderer.render(data));
    }, this));
  };

  return App;
});
