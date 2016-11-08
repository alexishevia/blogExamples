var express = require('express');
var router = express.Router();

// INDEX todos
router.get('/', function(req, res, next){
  req.app.get('db').todo.find(
  function(err, result){
    if(err){ return next(err); }
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
