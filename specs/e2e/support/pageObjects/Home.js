var driver = require('../getWebDriver')();
var wait = require('../wait');
var debug = require('debug')('test:pageObject:Home');

function finishLoading(){
  debug('finishLoading');
  var selector = {css: 'h1'};
  var regex = /Express/i;
  return wait.elementTextMatches(selector, regex);
}

function visitUsersPage(){
  return driver.findElement({css: 'a'}).click();
}

module.exports = {
  finishLoading: finishLoading,
  visitUsersPage: visitUsersPage,
};
