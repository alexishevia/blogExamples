import _ from 'lodash';

export default function toggleAll(checked) {
  // Note: it's usually better to use immutable data structures since they're
  // easier to reason about and React works very well with them. That's why
  // we use map() and filter() everywhere instead of mutating the array or
  // todo items themselves.
  this.setState({
    todos: this.state.todos.map(function (todo) {
      return _.extend({}, todo, {completed: checked});
    })
  });
};
