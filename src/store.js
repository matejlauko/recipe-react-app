import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initStore = () => {
  return createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
};

export default initStore;
