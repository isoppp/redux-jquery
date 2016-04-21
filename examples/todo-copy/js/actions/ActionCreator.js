import {createAction} from 'redux-actions';

export const ADD_TODO = 'ADD_TODO';
export const addTodo = createAction(ADD_TODO, (title) => title);

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = createAction(DELETE_TODO, (id) => id);

export const COMPLETE_TODO = 'COMPLETE_TODO';
export const completeTodo = createAction(COMPLETE_TODO, (id) => id);

export const ACTIVE_TODO = 'ACTIVE_TODO';
export const activeTodo = createAction(ACTIVE_TODO, (id) => id);

export const FILTER_TODO = 'FILTER_TODO';
export const filterTodo = createAction(FILTER_TODO, (filterName) => filterName);

export const INITIALIZE = 'INITIALIZE';
export const initialize = createAction(INITIALIZE, (todoObjects) => todoObjects);
