import Immutable, { Record, List } from 'immutable';
import { Recipe } from '../types';
import { LOAD_RECIPES, LOAD_RECIPES_SUCCESS, LOAD_RECIPES_FAIL, LIKE_RECIPE, DISLIKE_RECIPE } from './actions';
import { SAVE_RECIPE_SUCCESS } from '../Add/actions';

const InitialState = Record({
  loading: false,
  loaded: false,
  recipes: List(),
  error: null,
});

const initialState = new InitialState();

export default function listReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_RECIPES:
      return state
        .set('loading', true)
        .set('loaded', false)
        .set('error', null);

    case LOAD_RECIPES_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('recipes', Immutable.fromJS(action.payload));

    case LOAD_RECIPES_FAIL:
      return state
        .set('loading', false)
        .set('loaded', false)
        .set('error', action.payload);

    case SAVE_RECIPE_SUCCESS:
      return state.update('recipes', recipes => recipes.push(new Recipe(action.payload)));

    case LIKE_RECIPE:
    case DISLIKE_RECIPE:
      const index = state.get('recipes').findIndex(r => r.get('id') === action.payload.id);
      return state.update('recipes', recipes =>
        recipes.update(index, r => r.merge({ rating: action.payload.newRating }))
      );

    default:
      return state;
  }
}
