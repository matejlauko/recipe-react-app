// @flow
import Immutable, { Map, List } from 'immutable';
import * as R from 'ramda';
import { Recipe, ENDPOINTS, METHODS, type RecipeT, type RecipesT, type Endpoint, type Method } from './types';

const LOCAL_STORAGE_KEY = 'recipes_db';

/** TYPES & CONSTs */

type DBT = Map<'recipes', List<RecipeT>>;

type ResponsePayload<ResT> = ResT;
type DBRes<ResT> = [DBT, ResT];
// type DBRes = [DBT, {}];

const freshDB: DBT = Map({
  recipes: List(),
});

/** UTILITY FUNCs */
export const sleep = (min: number = 300, max: number = 1000): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min + 1) + min));

function loadDB(): DBT {
  let savedDB = localStorage.getItem(LOCAL_STORAGE_KEY);
  let loadedDB = freshDB;
  if (savedDB) {
    try {
      // $FlowFixMe
      loadedDB = (Immutable.fromJS(JSON.parse(savedDB)): DBT);
    } catch (e) {}
  }
  return loadedDB;
}

function saveDB(newDB: ?DBT): void {
  if (newDB) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDB.toJS()));
  }
}

/** API */

export function addRecipe(DB: DBT, title: string, text: string, drawing: any): DBRes<RecipeT> {
  return R.pipe(
    DB => DB.get('recipes').last(),
    lastRecipe => (lastRecipe ? lastRecipe.get('id') + 1 : 1),
    newId => new Recipe({ id: newId, title, text, drawing }),
    newRecipe => [DB.update('recipes', recipes => recipes.push(newRecipe)), newRecipe]
  )(DB);
}

export function updateRecipe(DB: DBT, id: number, updatedRecipe: {}): DBRes<RecipeT> {
  return R.pipe(
    DB => DB.get('recipes').findEntry(r => r.get('id') === id),
    ([index, recipe]) => [index, recipe.merge(updatedRecipe)],
    ([index, recipe]) => [DB.update('recipes', recipes => recipes.set(index, recipe)), recipe]
  )(DB);
}

export function listRecipes(DB: DBT): DBRes<RecipesT> {
  const recipesList: RecipesT = DB.get('recipes') || List();
  return [DB, recipesList];
}

export function recipes(
  DB: DBT,
  method: Method,
  param?: string,
  body: { title: string, text: string, drawing: any }
): DBRes<any> {
  switch (method) {
    case METHODS.POST:
      return addRecipe(DB, body.title, body.text, body.drawing);

    case METHODS.GET:
      if (!param) {
        return listRecipes(DB);
      }
      break;

    case METHODS.PATCH:
      return updateRecipe(DB, Number(param), body);

    default:
      return [DB, body];
  }
  return [DB, body];
}

export default async function api(endpoint: Endpoint, method: Method, body: string): ResponsePayload<*> {
  const DB = loadDB();
  if (method === METHODS.GET) {
    await sleep(4000, 6000);
  } else {
    await sleep();
  }
  let responsePayload: ResponsePayload<*> = {};
  let newDB: DBT | null = null;

  const endpointSplitted = endpoint.split('/');
  const bodyObj = JSON.parse(body);

  switch (endpointSplitted[0]) {
    case ENDPOINTS.RECIPES:
      [newDB, responsePayload] = recipes(DB, method, endpointSplitted[1], bodyObj);
      break;

    default:
      break;
  }

  saveDB(newDB);

  return responsePayload.toJS();
}
