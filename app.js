var express = require('express');
var app = express();

// the API will be handled by a different express app
app.use(require('./api/app')({ rootURL: '/api' }));

// this is our app (just render everything with the UI renderer
var UIRenderer = require('./ui_renderer');

var router = express.Router();

router.get('*', function(req, res){
  UIRenderer.render(req.url, function(err, content){
    if(err){
      if(err === 'ROUTE_NOT_FOUND'){
        return res.status(404).send('Not Found');
      }
      else {
        console.warn('Error trying to load component to string', err);
        return res.status(500).send('Internal Server Error');
      }
    }
    res.send(content);
  });
});

app.use('/', router);

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %d', server.address().port);
});
