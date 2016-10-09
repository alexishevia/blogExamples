var selenium = require('selenium-standalone');
var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var TerminalReporter = require('jasmine-reporters').TerminalReporter;
var reporter = new TerminalReporter({
  verbosity: 3,
  color: true,
  showStack: true
});
var webDriver, seleniumServer;

jasmine.addReporter(reporter);

jasmine.loadConfig({
  "spec_dir": "specs/e2e",
  "spec_files": ["**/*[sS]pec.js"],
  "stopSpecOnExpectationFailure": true,
  "random": false
});

jasmine.onComplete(function(passed){
  webDriver.close().then(function(){
    if(seleniumServer){
      seleniumServer.kill();
    }
    if(passed){ process.exit(0); }
    else { process.exit(1); }
  });
});

function startSelenium(cb){
  if(process.env.SELENIUM_SERVER){
    return cb();
  }

  selenium.install({}, function(err){
    if(err){
      throw 'Error installing selenium server' + err;
    }
    console.log('selenium server installed.');
    selenium.start({}, function(err, child){
      if(err){
        throw 'Error starting selenium server' + err;
      }
      console.log('selenium server started.');
      process.env.SELENIUM_SERVER = 'http://127.0.0.1:4444/wd/hub';
      seleniumServer = child;
      cb();
    });
  });
}

function startWebServer(cb){
  if(process.env.TEST_WEB_SERVER){
    return cb();
  }
  else {
    var serverRunner = require('../../bin/www');
    console.log('starting app server');
    serverRunner({
      onListening: function(address){
        var url = 'http://127.0.0.1:' + address.port;
        process.env.TEST_WEB_SERVER = url;
        console.log('app server listening on ' + url);
        cb();
      }
    });
  }
}

startSelenium(function(){
  startWebServer(function(){
    webDriver = require('./support/getWebDriver')();
    webDriver.get(process.env.TEST_WEB_SERVER)
    .then(function(){
      jasmine.execute();
    });
  });
});
