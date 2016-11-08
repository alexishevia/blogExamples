var express = require('express');
var router = express.Router();

// FIND a user by credentials
router.post('/sessions', function(req, res, next){
  req.app.get('db').findUserByCredentials([req.body.email, req.body.password],
  function(err, result){
    if(err){ return next(err); }
    else if(!result[0]){
      return res.status(404).send('Not Found');
    }
    // you could construct a JWT or a session here instead of
    // returning the user object
    res.status(201).json(result[0]);
  });
});

// CREATE a user
router.post('/', function(req, res, next){
  req.app.get('db').createUser([req.body.email, req.body.password],
  function(err, result){
    if(err){ return next(err); }
    res.status(201).json(result[0]);
  });
});

module.exports = router;
