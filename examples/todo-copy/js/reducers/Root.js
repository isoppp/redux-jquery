import { combineReducers } from 'redux';
import { TodoReducer } from './TodoReducer';
import { FilterReducer } from './FilterReducer';

export const RootReducer = combineReducers({
  todo: TodoReducer,
  filterTodo: FilterReducer
});
