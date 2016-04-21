import {handleActions} from 'redux-actions';
import {ADD_TODO, DELETE_TODO, ACTIVE_TODO, COMPLETE_TODO, INITIALIZE} from '../actions/ActionCreator';
import {TODO_STATUS} from '../contents/contents';

// 初期値
const INITIAL_STATE = [{name: 'name', id: 0, status: TODO_STATUS.ACTIVE}];

export const TodoReducer = handleActions({
  [INITIALIZE]: (state, action) => action.payload,
  [ADD_TODO]: (state, action) => {
    return [
      {
        name: action.payload,
        id: state.reduce((id, current) => Math.max(id, current.id), -1) + 1,
        status: TODO_STATUS.ACTIVE
      },
      ...state
    ]
  },
  [DELETE_TODO]: (state, action) => state.filter((todo) => todo.id !== Number(action.payload)),
  [ACTIVE_TODO]: (state, action) => {
    const i = state.findIndex((todo) => todo.id === Number(action.payload));
    state[i].status = TODO_STATUS.ACTIVE;
    return [...state];
  },
  [COMPLETE_TODO]: (state, action) => {
    return state.map((todo)=> todo.id === Number(action.payload) ? todo.status = TODO_STATUS.COMPLETE : todo);
  }
}, INITIAL_STATE);