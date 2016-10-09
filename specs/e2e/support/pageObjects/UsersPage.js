var driver = require('../getWebDriver')();
var wait = require('../wait');
var debug = require('debug')('test:pageObject:UsersPage');

function finishLoading(){
  debug('finishLoading');
  var selector = {css: 'body'};
  var regex = /User's Page/i;
  return wait.elementTextMatches(selector, regex);
}

module.exports = {
  finishLoading: finishLoading,
};
