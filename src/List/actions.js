// @flow
import { type RecordOf } from 'immutable';
import fetch, { handleErrors, handleResponse } from '../fetch';
import { ENDPOINTS, METHODS } from '../types';

export const LOAD_RECIPES = 'LOAD_RECIPES';
export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_FAIL = 'LOAD_RECIPES_FAIL';
export const LIKE_RECIPE = 'LIKE_RECIPE';
export const DISLIKE_RECIPE = 'DISLIKE_RECIPE';

export const likeRecipe = (id: number, currentRating: number = 0) => (dispatch: any => {}) => {
  const newRating = currentRating + 1;
  dispatch({ type: LIKE_RECIPE, payload: { id, newRating } });

  return fetch(`${ENDPOINTS.RECIPES}/${id}`, { method: METHODS.PATCH, body: { rating: newRating } })
    .then(handleErrors)
    .then(handleResponse(dispatch, LIKE_RECIPE));
};

export const dislikeRecipe = (id: number, currentRating: number = 0) => (dispatch: any => {}) => {
  const newRating = currentRating - 1;
  dispatch({ type: DISLIKE_RECIPE, payload: { id, newRating } });

  return fetch(`${ENDPOINTS.RECIPES}/${id}`, { method: METHODS.PATCH, body: { rating: newRating } })
    .then(handleErrors)
    .then(handleResponse(dispatch, DISLIKE_RECIPE));
};

export const loadRecipes = () => (dispatch: any => {}, getState: () => RecordOf<any>) => {
  dispatch({ type: LOAD_RECIPES });

  return fetch(ENDPOINTS.RECIPES)
    .then(handleErrors)
    .then(handleResponse(dispatch, LOAD_RECIPES));
};
