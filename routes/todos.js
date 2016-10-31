var express = require('express');
var router = express.Router();

// INDEX todos
router.get('/', function(req, res, next){
  req.app.get('db').todo.find(
  function(err, result){
    if(err){ return next(err); }
    res.status(200).type('json')
       .send(JSON.stringify(result));
  });
});

// CREATE a todo
router.post('/', function(req, res, next) {
  req.app.get('db').todo.save({
    text: req.body.text
  }, function(err, result){
    if(err){ return next(err); }
    res.status(201).type('json')
       .send(JSON.stringify(result));
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
    res.status(200).type('json')
       .send(JSON.stringify(result));
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
    res.status(200).type('json')
       .send(JSON.stringify(result));
  });
});

module.exports = router;
