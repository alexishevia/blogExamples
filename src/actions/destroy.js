export default function destroy(todo) {
  this.setState({
    todos: this.state.todos.filter(function (candidate) {
      return candidate !== todo;
    })
  });
};
