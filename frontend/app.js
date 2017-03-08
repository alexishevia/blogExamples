
$.ajax({
    type: 'GET',
    url: 'http://localhost:3000',
    xhrFields: {
      withCredentials: true
    }
  })
  .done(function(res, status, xhr){
    var headers = $([
      '<div>',
        'Response Headers:',
        '<pre>', xhr.getAllResponseHeaders(), '</pre>',
      '</div>'
    ].join(''));
    $('body').append(headers);
  })
  .fail(function(err){
    throw err;
  });
