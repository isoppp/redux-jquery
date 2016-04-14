import { handleActions } from 'redux-actions';
import { ADDTODO } from '../actions/ActionCreator';

// 初期値
const INITIAL_STATE = '';

export const TodoReducer = handleActions({
  [ADDTODO]: (state, action) => action.payload
},INITIAL_STATE);