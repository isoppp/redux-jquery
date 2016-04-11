import {createAction} from 'redux-actions';

export const UPDATENAME = 'UPDATENAME';
export const updateName = createAction(UPDATENAME, (name)=> name);
