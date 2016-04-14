import {handleActions} from 'redux-actions';
import {FILTER_TODO} from '../actions/ActionCreator';
import {FILTER_STATUS} from '../contents/contents';

// 初期値
const INITIAL_STATE = FILTER_STATUS.ACTIVE;

export const FilterReducer = handleActions({
  [FILTER_TODO]: (state, action) => action.payload
}, INITIAL_STATE);