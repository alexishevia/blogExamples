define([
  'jquery',
  'react',
  'history',
  'underscore',
  'uri-templates',
  'routes'
], function($, React, History, _, UriTemplate, ROUTES){

  function loadDataIntoProp(prop, data){
    if      (_.isFunction(prop.reset))  { prop.reset(data); }
    else if (_.isFunction(prop.set))    { prop.set(data); }
    else { console.warn('prop is not a Backbone model or collection'); }
  }

  function parseRoutes(routes){
    var parsed = {};

    _.each(routes, function(name, template){
      var uriTemplate = new UriTemplate(template);
      parsed[name] = uriTemplate;
    });

    return parsed;
  };

  function getMatchingRoute(routes, url){
    var name = _.find(_.keys(routes), function(name){
      var template = routes[name];
      return template.fromUri(url) || template.fromUri(url + '/');
    }, this);

    if(name){
      return {
        controllerPath: 'controllers/' + name,
        uriTemplate: routes[name]
      };
    }
  }

  function getRoute(routes, url){
    var deferred = $.Deferred();

    var route = getMatchingRoute(routes, url);

    if(route){
      require([route.controllerPath], function(controller){
        route.controller = controller;
        deferred.resolve(route);
      });
    }
    else {
      var msg = 'Could not find matching controller for ' + url;
      console.warn(msg);
      deferred.reject(msg);
    }

    return deferred;
  };

  function readURL(){
    return History.getState().hash.replace(/&_suid=\d*/, '');
  }

  var App = function(options){
    options = options || {};

    this.mountPoint = options.mountPoint;
    this.routes = parseRoutes(ROUTES);

    // re-render on url changes
    History.Adapter.bind(window, 'statechange', _.bind(this.render, this));
  };

  App.prototype.url = function(urlName, options){
    options = _.extend({ parse: true }, options);

    var url;
    if(options.urlParams){
      url = this.routes[urlName].fillFromObject(options.urlParams);
    } else {
      url = urlName;
    }

    if(options.pushState){
      History.pushState(null, 'Seeder - Knowledge is power.', url);
      return this;
    }
    else if(options.replaceState){
      History.replaceState(null, 'Seeder - Knowledge is power.', url);
      return this;
    }
    else {
      return url;
    }
  }

  App.prototype.render = function(){
    var url = readURL();

    getRoute(this.routes, url).done(_.bind(function(route){
      var urlObj = route.uriTemplate.fromUri(url) || route.uriTemplate.fromUri(url + '/') ;
      var props = route.controller.params(urlObj, _.bind(this.url, this));

      if(props._redirect){
        return this.url.apply(this, props._redirect);
      }

      // grab boostrapped data
      if(window.bootstrappedProps){
        _.each(window.bootstrappedProps, function(val, key){
          loadDataIntoProp(props[key], val);
        });
        window.bootstrappedProps = null;
      }

      // render component into DOM
      React.renderComponent(
        new route.controller.view(props),
        this.mountPoint
      );

      // fetch data
      _.each(route.controller.mustFetch(props), function(key){
        props[key].fetch();
      });

      return this;
    }, this));
  };

  return App;

});

