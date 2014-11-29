/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react/addons');

var Component = React.createClass({
    getInitialState: function () {
        return { editText: this.props.todo.text };
    },
    render: function () {
        var classSet = React.addons.classSet({
            completed: this.props.todo.completed,
            editing: this.props.editing,
            pending: this.props.todo.pending,
            failure: this.props.todo.failure
        });

        return (
            <li className={classSet}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        disabled={this.props.todo.failure}
                    />
                    <label>
                        {this.props.todo.text}
                    </label>
                    <button
                        className="destroy"
                        disabled={this.props.todo.failure}
                    />
                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                />
            </li>
        );
    }
});

module.exports = Component;
