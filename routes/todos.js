var express = require('express');
var router = express.Router();
var debug = require('debug');

// INDEX todos
router.get('/', function(req, res, next){
  var _debug = debug('faruApi:todos:index');
  _debug('START');

  req.app.get('db').todo.find(
  function(err, result){
    if(err){
      _debug('ERROR', err);
      return next(err);
    }
    _debug('SUCCESS', result);
    res.json(result);
  });
});

// CREATE a todo
router.post('/', function(req, res, next) {
  req.app.get('db').todo.save({
    text: req.body.text
  }, function(err, result){
    if(err){ return next(err); }
    res.status(201).json(result);
  });
});

// UPDATE a todo
router.put('/:id', function(req, res, next) {
  req.app.get('db').todo.save({
    id: req.params.id,
    text: req.body.text
  }, function(err, result){
    if(err){ return next(err); }
    else if(!result){
      return res.status(404).send('Not Found');
    }
    res.json(result);
  });
});

// DELETE a todo
router.delete('/:id', function(req, res, next) {
  req.app.get('db').todo.save({
    id: req.params.id,
    deletedAt: 'NOW()'
  }, function(err, result){
    if(err){ return next(err); }
    else if(!result){
      return res.status(404).send('Not Found');
    }
    res.json(result);
  });
});

module.exports = router;
