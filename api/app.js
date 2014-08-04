'use strict';

var path = require('path');
var express = require('express');
var _ = require('underscore');
var app = express();
var router = express.Router();

// read 'fake data' file
var fs = require('fs');
var file = __dirname + '/fake_data.json';
var fakeData;

fs.readFile(file, 'utf8', function (err, data) {
  if(err) { throw err; }
  fakeData = JSON.parse(data);
});

router.get('/posts', function(req,res){
  res.json([fakeData[0], fakeData[2]]);
});

router.get('/posts/:id', function(req,res){
  var post = _.find(fakeData, function(post){
    return post.id === parseInt(req.params.id,10);
  });
  if(post){
    return res.json(post);
  }
  else {
    return res.status(404).send('Not Found');
  }
});


module.exports = function(moduleOptions){
  app.use(moduleOptions.rootURL, router);
  return app;
};
