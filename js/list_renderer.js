define(['underscore'], function(_){

  function renderRecursive(level){
    // get people for the current level
    var result = _.map(level, function(person){
      return renderPerson(person);
    });

    // get people from levels below
    result = result.concat(_.flatten(_.map(level, function(person){
      return renderRecursive(person.subordinates);
    })));

    return result;
  };

  function renderPerson(person){
    return $('<li>').html(person.name + ', ' + person.position);
  };

  return {
    render: function(data){
      return $('<ul>').html(renderRecursive(data));
    }
  };

});
