import { Record } from 'immutable';
import {
  UPDATE_TITLE,
  UPDATE_TEXT,
  UPDATE_DRAWING,
  SAVE_RECIPE,
  SAVE_RECIPE_SUCCESS,
  SAVE_RECIPE_FAIL,
} from './actions';

const InitialState = Record({
  title: '',
  text: '',
  drawing: '',
  saving: false,
  saved: false,
  error: null,
});

const initialState = new InitialState();

export default function addReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_TITLE:
      return state.set('title', action.payload);

    case UPDATE_TEXT:
      return state.set('text', action.payload);

    case UPDATE_DRAWING:
      return state.set('drawing', action.payload);

    case SAVE_RECIPE:
      return state
        .set('saving', true)
        .set('saved', false)
        .set('error', null);

    case SAVE_RECIPE_SUCCESS:
      return state
        .set('saving', false)
        .set('saved', true)
        .set('title', '')
        .set('text', '')
        .set('drawing', '');

    case SAVE_RECIPE_FAIL:
      return state
        .set('saving', false)
        .set('saved', false)
        .set('error', action.payload);

    default:
      return state;
  }
}
