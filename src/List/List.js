import React from 'react';
import PT from 'prop-types';
import Recipe from './Recipe';
import s from './List.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import sb from '../styles/index.scss';

export const NoRecipes = () => <h3 className={s.noRecipes}>No recipes yet.. ADD SOME!</h3>;

export const ErrorLoading = ({ loadRecipes }) => (
  <h3 className={s.loadinError}>
    Recipes couldn't load.. <a onClick={loadRecipes}>Try again!</a>
  </h3>
);

ErrorLoading.propTypes = { loadRecipes: PT.func.isRequired };

const Pizza = () => <img className={s.loader} width="40px" src="pizza.svg" role="presentation" />; // eslint-disable-line jsx-a11y/alt-text
export const RecipesLoader = () => (
  <div className={s.loader}>{Array.from(Array(5)).map((_, i) => <Pizza key={i} />)}</div>
);

export const RecipeList = ({ recipes, likeRecipe, dislikeRecipe }) => (
  <ul className={s.recipeList}>
    {recipes.map(recipe => (
      <Recipe key={`recipe-${recipe.get('id')}`} recipe={recipe} like={likeRecipe} dislike={dislikeRecipe} />
    ))}
  </ul>
);

RecipeList.propTypes = {
  recipes: PT.object.isRequired, // List
  likeRecipe: PT.func.isRequired,
  dislikeRecipe: PT.func.isRequired,
};

const List = ({ render, match }) => (
  <div className={s.List}>
    {match.isExact && (
      <Link to="/add" className={cx(sb.button, s.button)}>
        Add recipe
      </Link>
    )}

    <div className={s.ListContent}>{render}</div>
  </div>
);

List.propTypes = {
  match: PT.object.isRequired,
  render: PT.element.isRequired,
};

export default List;
