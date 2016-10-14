import _ from 'lodash';
import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';

const ENTER_KEY = 13;

export default class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: null,
      newTodo: ''
    };
  }

  handleChange(event) {
    this.setState({newTodo: event.target.value});
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      this.props.app.addTodo(val);
      this.setState({newTodo: ''});
    }
  }

  toggleAll(event) {
    var checked = event.target.checked;
    this.props.app.toggleAll(checked);
  }

  toggle(todoToToggle) {
    this.props.app.toggle(todoToToggle);
  }

  destroy(todo) {
    this.props.app.destroy(todo);
  }

  edit(todo) {
    this.setState({editing: todo.id});
  }

  save(todoToSave, text) {
    this.props.app.save(todoToSave, text);
    this.setState({editing: null});
  }

  cancel() {
    this.setState({editing: null});
  }

  clearCompleted() {
    this.props.app.clearCompleted();
  }

  render() {
    let {todos} = this.props.app.state;
    let {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} = this.props.app;
    let footer, main;

    var shownTodos = todos.filter(function (todo) {
      switch (this.props.params.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    var todoItems = shownTodos.map(function (todo) {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel.bind(this)}
        />
      );
    }, this);

    var activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          {...{ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS}}
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.props.params.nowShowing}
          onClearCompleted={this.clearCompleted.bind(this)}
        />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll.bind(this)}
            checked={activeTodoCount === 0}
            />
            <ul className="todo-list">
              {todoItems}
              </ul>
            </section>
      );
    }

    return (
      <div className="todoapp">
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.newTodo}
              onKeyDown={this.handleNewTodoKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}
              autoFocus={true}
            />
          </header>
          {main}
          {footer}
        </div>
      </div>
    );
  }
}
