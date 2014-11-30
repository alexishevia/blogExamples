'use strict';
var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var TodoStore = require('../stores/TodoStore');
var TodoItem = require('./TodoItem');
var createTodo = require('../actions/createTodo');

var ENTER_KEY = 13;

module.exports = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: {
            _onChange: [TodoStore]
        }
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        return {
            items: this.getStore(TodoStore).getAll()
        };
    },
    _onChange: function() {
        this.setState(this.getState());
    },
    handleNewTodoKeyDown: function (event) {
        if (event.which !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var text = this.refs.newField.getDOMNode().value.trim();

        if (text) {
            this.props.context.executeAction(createTodo, {
                text: text
            });
            this.refs.newField.getDOMNode().value = '';
        }
    },
    render: function(){
        var main;
        var todos = this.state.items;
        var todoItems = todos.map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                />
            );
        }, this);

        if (todos.length) {
            main = (
                <section id="main">
                    <ul id="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header id="header">
                    <h1>todos</h1>
                    <input
                        ref="newField"
                        id="new-todo"
                        placeholder="What needs to be done?"
                        onKeyDown={this.handleNewTodoKeyDown}
                        autoFocus={true}
                    />
                </header>
                {main}
            </div>
        );
    }
});
