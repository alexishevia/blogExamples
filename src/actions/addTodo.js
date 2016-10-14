import uuid from '../utils/uuid';

export default function addTodo(title){
  this.setState({
    todos: this.state.todos.concat({
      id: uuid(),
      title: title,
      completed: false
    })
  });
}
