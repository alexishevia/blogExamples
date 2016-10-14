import React from 'react';
import classNames from 'classnames';
import pluralize from '../utils/pluralize';
import { Link } from 'react-router';

export default function TodoFooter(props){
  var activeTodoWord = pluralize(props.count, 'item');
  var clearButton = null;

  if (props.completedCount > 0) {
    clearButton = (
      <button
        className="clear-completed"
        onClick={props.onClearCompleted}>
        Clear completed
      </button>
    );
  }

  var nowShowing = props.nowShowing;
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <Link
            to="/"
            className={classNames({selected: nowShowing === props.ALL_TODOS})}>
            All
          </Link>
        </li>
        {' '}
        <li>
          <Link
            to={`/${props.ACTIVE_TODOS}`}
            className={classNames({selected: nowShowing === props.ACTIVE_TODOS})}>
            Active
          </Link>
        </li>
        {' '}
        <li>
          <Link
            to={`/${props.COMPLETED_TODOS}`}
            className={classNames({selected: nowShowing === props.COMPLETED_TODOS})}>
            Completed
          </Link>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}
