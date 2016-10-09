var promise = require('selenium-webdriver/lib/promise').Promise;
var driver = require('./getWebDriver')();

exports.seconds = function(seconds){
  return new promise(function(resolve, reject){
    setTimeout(resolve, seconds * 1000);
  });
}

exports.elementTextMatches = function(selector, regex){
  return driver.wait(function(){
    return driver.findElements(selector)
    .then(function(els){
      if(els.length > 0){
        return driver.findElement(selector).getText();
      }
      else {
        return false;
      }
    })
    .then(function(text){
      return text.match && text.match(regex);
    });
  });
}

exports.elementIsNotVisible = function(selector){
  return driver.wait(function(){
    return driver.findElements(selector)
    .then(function(els){
      if(els.length === 0){
        return true; // element is not present in page
      }
      else {
        return els[0].isDisplayed()
        .then(function(visible){
          return !visible;
        });
      }
    })
  });
}
