import {createAction} from 'redux-actions';

export const ADDTODO = 'ADDTODO';
export const addTodo = createAction(ADDTODO, (name)=> name);

export const FILTER_TODO = 'FILTER_TODO';
export const filterTodo = createAction(FILTER_TODO, (title)=> title); // この関数はpayloadの中身
