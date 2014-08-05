requirejs.config({
  baseUrl: '/public',
  paths: {
    'jquery': '../node_modules/jquery/dist/jquery',
    'react': '../bower_components/react/react-with-addons',
    'history': '../bower_components/history.js/scripts/bundled/html4+html5/native.history',
    'underscore': '../bower_components/underscore/underscore',
    'uri-templates': '../node_modules/uri-templates/uri-templates',
    'backbone': '../bower_components/backbone/backbone'
  },
  shim: {
    'uri-templates': {
      exports: 'UriTemplate'
    },
    'history': {
      exports: 'History'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});
