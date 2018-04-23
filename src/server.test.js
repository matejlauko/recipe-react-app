import { List, Map } from 'immutable';
import api, { sleep, addRecipe, recipes, listRecipes, updateRecipe } from './server';
import { Recipe } from './types';

it('should sleep random time', done => {
  const startTime = new Date().getTime();
  sleep().then(_ => {
    const duration = new Date().getTime() - startTime;
    console.log('dur', duration);
    expect(300 < duration && duration < 1000).toBeTruthy();
    done();
  });
});

const DB = Map({
  recipes: List([]),
});

/* Adding a Recipe */

const newRecipe = new Recipe({ id: 1, title: 'First R', text: 'R text', drawing: 'pic' });

it('should add recipe to DB', () => {
  const [newDb, resp] = addRecipe(DB, 'First R', 'R text', 'pic');
  expect(newDb.get('recipes')).toEqual(List([newRecipe]));
  expect(resp).toEqual(newRecipe);
});

it('should add recipe to DB through recipes endpoint', () => {
  const [newDb, resp] = recipes(DB, 'POST', undefined, { title: 'First R', text: 'R text', drawing: 'pic' });
  expect(newDb.get('recipes')).toEqual(List([newRecipe]));
  expect(resp).toEqual(newRecipe);
});

/* Listing Recipes */

const recipesList = List([
  new Recipe({ id: 1, title: 'First R', text: 'R text', drawing: 'pic' }),
  new Recipe({ id: 2, title: 'Second R', text: 'R2 text', drawing: 'pic' }),
]);
const listDB = DB.set('recipes', recipesList);

it('should list recipes from DB', () => {
  const [newDB, resp] = listRecipes(listDB);
  expect(resp).toEqual(recipesList);
  expect(newDB.get('recipes')).toEqual(recipesList);
});

it('should list recipes through recipes endpoint', () => {
  const [newDB, resp] = recipes(listDB, 'GET', undefined);
  expect(resp).toEqual(recipesList);
  expect(newDB.get('recipes')).toEqual(recipesList);
});

/* Updating a Recipe */

const updateDB = DB.set('recipes', recipesList);

it('should update recipe to DB', () => {
  const updatedRecipe = new Recipe({ id: 2, title: 'Second R update', text: 'R2 text', drawing: 'pic' });
  const [newDb, resp] = updateRecipe(updateDB, 2, { title: 'Second R update' });

  expect(newDb.get('recipes')).toEqual(
    List([new Recipe({ id: 1, title: 'First R', text: 'R text', drawing: 'pic' }), updatedRecipe])
  );
  expect(resp).toEqual(updatedRecipe);
});

it('should update recipe to DB through recipes endpoint', () => {
  const updatedRecipe = new Recipe({ id: 2, title: 'Second R update', text: 'R2 text', drawing: 'pic' });
  const [newDb, resp] = recipes(updateDB, 'PATCH', '2', { title: 'Second R update' });

  expect(newDb.get('recipes')).toEqual(
    List([new Recipe({ id: 1, title: 'First R', text: 'R text', drawing: 'pic' }), updatedRecipe])
  );
  expect(resp).toEqual(updatedRecipe);
});
