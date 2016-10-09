var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var driver;

module.exports = function(){
  if(!driver){
    driver = new webdriver.Builder()
      .usingServer(process.env.SELENIUM_SERVER)
      .forBrowser(process.env.TEST_BROWSER || 'chrome')
      .build();
  }
  return driver;
}
