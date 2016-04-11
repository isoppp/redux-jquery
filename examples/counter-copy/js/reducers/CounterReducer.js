import { handleActions } from 'redux-actions';
import { INCREMENT, DECREMENT } from '../actions/ActionCreator';

// 初期値
const INITIAL_STATE = 0;

export const CounterReducer = handleActions({
  [INCREMENT]: (state) => state + 1,
  [DECREMENT]: (state) => state - 1
},INITIAL_STATE);