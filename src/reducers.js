import { combineReducers } from 'redux';
import add from './Add/reducer';
import list from './List/reducer';

const reducers = combineReducers({
  add,
  list,
});

export default reducers;
