define(['jstree'], function(){
  return {
    render: function(data){
      return $('<div>').jstree({
        core: {
          data: data
        }
      });
    }
  };
});

