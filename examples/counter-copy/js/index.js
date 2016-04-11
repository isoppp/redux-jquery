import $ from 'jquery';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import { RootReducer } from './reducers/Root';
import Counter from './components/Counter';

const createStoreWithMiddleware = applyMiddleware(createLogger())(createStore);
const store = createStoreWithMiddleware(RootReducer);

$(() => {
  new Counter('.js-counterBox', store);
});
