import { handleActions } from 'redux-actions';
import { UPDATENAME } from '../actions/ActionCreator';

// 初期値
const INITIAL_STATE = 'default';

export const GreetingReducer = handleActions({
  [UPDATENAME]: (state, action) => action.payload
},INITIAL_STATE);