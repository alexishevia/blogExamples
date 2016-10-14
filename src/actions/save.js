import _ from 'lodash';

export default function save(todoToSave, text) {
  this.setState({
    todos: this.state.todos.map(function (todo) {
      return todo !== todoToSave ? todo : _.extend({}, todo, {title: text});
    })
  });
};
