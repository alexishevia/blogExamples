import _ from 'lodash';
import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router'
import Todos from './components/Todos';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './utils/constants';
import {
addTodo, clearCompleted, destroy, save, toggle, toggleAll
} from './actions';

export default class App extends Component {
  constructor(props) {
    super(props);

    // app state
    this.state = {
      todos: []
    };

    // actions
    _.extend(this,
             {addTodo, clearCompleted, destroy, save, toggle, toggleAll});

    // constants
    _.extend(this, {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS});
  }

  _renderTodos(matchProps){
    return (<Todos app={this} {...matchProps} />);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="todoapp">
          <Match pattern="/" exactly render={this._renderTodos.bind(this)} />
          <Match pattern="/:nowShowing" render={this._renderTodos.bind(this)} />
        </div>
      </BrowserRouter>
    );
  }
}
