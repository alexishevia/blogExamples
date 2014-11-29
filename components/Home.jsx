'use strict';
var React = require('react');
var StoreMixin = require('fluxible-app').StoreMixin;
var TodoStore = require('../stores/TodoStore');
var TodoItem = require('./TodoItem');

module.exports = React.createClass({
    mixins: [StoreMixin],
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
                </header>
                {main}
            </div>
        );
    }
});
