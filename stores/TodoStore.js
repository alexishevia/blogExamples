/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible-app/utils/createStore');


module.exports = createStore({
    storeName: 'TodoStore',
    handlers: {
        'RECEIVE_TODOS_SUCCESS': '_receiveTodos'
    },
    initialize: function () {
        this.todos = [];
    },
    _receiveTodos: function (todos) {
        this.todos = todos;
        this.emitChange();
    },
    getAll: function () {
        return this.todos;
    },
    dehydrate: function () {
        return {
            todos: this.todos
        };
    },
    rehydrate: function (state) {
        this.todos = state.todos;
    }
});
