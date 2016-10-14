import _ from 'lodash';

export default function toggle(todoToToggle) {
  this.setState({
    todos: this.state.todos.map(function (todo) {
      return todo !== todoToToggle ?
        todo :
        _.extend({}, todo, {completed: !todo.completed});
    })
  });
};
