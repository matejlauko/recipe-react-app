// @flow
import { List, Record, type RecordOf, type RecordFactory } from 'immutable';

export type RecipeValues = {|
  id: number,
  title: string,
  text: string,
  drawing: any,
  rating: number,
|};
export type RecipeT = RecordOf<RecipeValues>;
export type RecipesT = List<RecipeT>;

export const Recipe: RecordFactory<RecipeValues> = Record({
  id: 0,
  title: '',
  text: '',
  drawing: null,
  rating: 0,
});

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
};
export type Method = $Values<typeof METHODS>;

export const ENDPOINTS = {
  RECIPES: 'recipes',
};
export type Endpoint = $Values<typeof ENDPOINTS>;

export type Response = {
  status: number,
  statusText: string,
  json: () => Promise<{}>,
};
