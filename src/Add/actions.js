// @flow
import { type RecordOf } from 'immutable';
import fetch, { handleErrors, handleResponse } from '../fetch';
import { ENDPOINTS } from '../types';

export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_TEXT = 'UPDATE_TEXT';
export const UPDATE_DRAWING = 'UPDATE_DRAWING';
export const SAVE_RECIPE = 'SAVE_RECIPE';
export const SAVE_RECIPE_SUCCESS = 'SAVE_RECIPE_SUCCESS';
export const SAVE_RECIPE_FAIL = 'SAVE_RECIPE_FAIL';

export const updateTitle = (newVal: string): { type: typeof UPDATE_TITLE, payload: string } => ({
  type: UPDATE_TITLE,
  payload: newVal,
});

export const updateText = (newVal: string): { type: typeof UPDATE_TEXT, payload: string } => ({
  type: UPDATE_TEXT,
  payload: newVal,
});

export const updateDrawing = (newVal: string): { type: typeof UPDATE_DRAWING, payload: string } => ({
  type: UPDATE_DRAWING,
  payload: newVal,
});

export const saveRecipe = () => (dispatch: any => {}, getState: () => RecordOf<any>) => {
  dispatch({ type: SAVE_RECIPE });

  return fetch(ENDPOINTS.RECIPES, {
    method: 'POST',
    body: {
      title: getState().add.get('title'),
      text: getState().add.get('text'),
      drawing: getState().add.get('drawing'),
    },
  })
    .then(handleErrors)
    .then(handleResponse(dispatch, SAVE_RECIPE));
};
