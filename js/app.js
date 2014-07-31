define([
  'underscore', 'jquery', 'organization_data', 'renderers/list', 'renderers/chart'
], function(_, $, data, ListRenderer, ChartRenderer){

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
      '</div>').append(this.renderContent());
  };

  App.prototype.renderContent = function(){
    var renderer = { list: ListRenderer, chart: ChartRenderer }[this.display];
    return $('<div>').html(renderer.render(data));
  };

  return App;
});
