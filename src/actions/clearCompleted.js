export default function clearCompleted() {
  this.setState({
    todos: this.state.todos.filter(function (todo) {
      return !todo.completed;
    })
  });
};
