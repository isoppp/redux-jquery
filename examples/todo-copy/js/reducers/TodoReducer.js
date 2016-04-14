import {handleActions} from 'redux-actions';
import {ADDTODO, INITIALIZE} from '../actions/ActionCreator';
import {TODO_STATUS} from '../contents/contents';

// 初期値
const INITIAL_STATE = {};

export const TodoReducer = handleActions({
    [INITIALIZE]: (state, action) => {
      return action.payload
    },
    [ADDTODO]: (state, action) => {
      return [
        {
          name: action.payload,
          id: state.reduce((id,current) => Math.max(id,current.id), -1) + 1,
          status: TODO_STATUS.ACTIVE
        },
        ...state
      ]
    }
  }, INITIAL_STATE);