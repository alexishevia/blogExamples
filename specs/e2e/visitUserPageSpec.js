var _ = require('lodash');
var driver = require('./support/getWebDriver')();
var wait = require('./support/wait');
var Home = require('./support/pageObjects/Home');
var UsersPage = require('./support/pageObjects/UsersPage');
var onFail = require('./support/onFail');

describe("Visiting the Users Page", function(){
  it("works", function(done){
    driver.get(process.env.TEST_WEB_SERVER)
    .then(Home.finishLoading)
    .then(Home.visitUsersPage)
    .then(UsersPage.finishLoading)
    .then(done)
    .catch(_.partial(onFail, done));
  });
});
