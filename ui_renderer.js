var path = require('path');
var _ = require('underscore');
var requirejs = require('requirejs');
var async = require('async');
var request = require('request');
var React = require('react');
var UriTemplate = require('uri-templates');

requirejs.config({
  baseUrl: path.join(__dirname, '/.tmp'),
  nodeRequire: require,

  paths: {
    'underscore': '../bower_components/underscore/underscore',
    'backbone': '../bower_components/backbone/backbone',
    'supermodel': '../bower_components/supermodel/supermodel.min'
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'supermodel': {
      deps: ['backbone'],
      exports: 'Supermodel'
    }
  },
});

function parseRoutes(routes){
  var parsed = {};

  _.each(routes, function(name, template){
    var uriTemplate = new UriTemplate(template);
    parsed[name] = uriTemplate;
  });

  return parsed;
};

var ROUTES = parseRoutes(requirejs('routes'));

function getMatchingRoute(routes, url){
  var template;
  var name = _.find(_.keys(routes), function(name){
    template = routes[name];
    return template.fromUri(url) || template.fromUri(url + '/');
  }, this);

  if(name){
    if(routeWasGreedilyAccepted(template, url)){
      return null;
    }
    return {
      controllerPath: 'controllers/' + name,
      uriTemplate: routes[name]
    };
  }
}

function routeWasGreedilyAccepted(template, url){
  // uri-templates accepts any url as the root template, which means the
  // "/foo/bar" url will match the "/" template, which is incorrect.
  // This function returns true if the root template was incorrectly matched.
  var rootTemplateRegex = /^\/({.*)?$/;
  var rootURLRegex = /^\/(\?.*)?$/;
  return ( template.template.match(rootTemplateRegex) &&
           !url.match(rootURLRegex) );
}

function getURL(urlName, urlOpts){
  var url = ROUTES[urlName].fillFromObject(urlOpts || {});
  return url;
}

function getModelUrl(model){
  if(_.isFunction(model.url)){
    return model.url();
  }
  return model.url;
}

function fetchProps(options, callback){
  async.parallel(_.map(options.propsToFetch, function(prop){
    var model = options.props[prop];
    var url = getModelUrl(model);
    return _.partial(request, options.host + url);
  }), function(err, results){
    if(err){ callback(err); }
    else {
      for(var i=0, len=results.length; i<len; i++){
        var model = options.props[options.propsToFetch[i]];
        loadDataIntoProp(model, results[i]);
      }
    }
    callback(null, options.props);
  });
}

function loadDataIntoProp(prop, fetchResult){
  if(fetchResult[0].statusCode === 200){
    try {
      var data = JSON.parse(fetchResult[1]);
      if      (_.isFunction(prop.reset))  { prop.reset(data); }
      else if (_.isFunction(prop.set))    { prop.set(data); }
      else { console.warn('prop is not a Backbone model or collection'); }
    }
    catch (e){
      console.warn('could not load data into prop', e);
    }
  }
  else {
    console.warn('statusCode was not 200',
                 fetchResult[0].statuCode, fetchResult[1]);
  }
}

module.exports = {

  render: function(url, options, callback){
    if(!callback){
      callback = options;
      options = {};
    }

    var route = getMatchingRoute(ROUTES, url);

    if(!route){
      return callback('ROUTE_NOT_FOUND');
    }

    requirejs([route.controllerPath], function(controller){
      var urlObj = (route.uriTemplate.fromUri(url) ||
                    route.uriTemplate.fromUri(url + '/') );
      var props = controller.params(urlObj, getURL);
      var propsToFetch = controller.mustFetch(props);

      fetchProps({
        props: props,
        propsToFetch: propsToFetch,
        host: 'http://localhost:' + (process.env.PORT || '3000')
      }, function(err, props){
        if(err){ console.warn('error trying to fetch data for props', err); }
        var component = new controller.view(props);
        var content = React.renderComponentToString(component);

        if(!err){
          var map = {};
          _.each(propsToFetch, function(prop){
            map[prop] = props[prop];
          });
          content += [
            '<script>',
            "window.bootstrappedProps=JSON.parse('",
              JSON.stringify(map).replace(/'/g, "\\'"),
            "');</script>"
          ].join('');
        }

        return callback(null, content);
      });
    });
  }

};

