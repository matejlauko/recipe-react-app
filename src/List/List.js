import React, { Component } from 'react';
import { connect } from 'react-redux';
import Recipe from './Recipe';
import s from './List.scss';
import sb from '../styles/index.scss';
import { loadRecipes, likeRecipe, dislikeRecipe } from './actions';
import cx from 'classnames';
import { Link } from 'react-router-dom';

const NoRecipes = () => <h3 className={s.noRecipes}>No recipes yet.. ADD SOME!</h3>;

const ErrorLoading = ({ loadRecipes }) => (
  <h3 className={s.loadinError}>
    Recipes couldn't load.. <a onClick={loadRecipes}>Try again!</a>
  </h3>
);

const Pizza = () => <img className={s.loader} width="40px" src="pizza.svg" role="presentation" />; // eslint-disable-line jsx-a11y/alt-text
const RecipesLoader = () => <div className={s.loader}>{Array.from(Array(5)).map((_, i) => <Pizza key={i} />)}</div>;

class List extends Component {
  componentDidMount() {
    this.props.loadRecipes();
  }

  render() {
    const { recipes, loading, loaded, error, likeRecipe, dislikeRecipe, match } = this.props;

    return (
      <div className={s.List}>
        {match.isExact && (
          <Link to="/add" className={cx(sb.button, s.button)}>
            Add recipe
          </Link>
        )}

        <div className={s.ListContent}>
          {loading ? (
            <RecipesLoader />
          ) : loaded && recipes.size ? (
            <ul className={s.recipeList}>
              {recipes.map(recipe => (
                <Recipe key={`recipe-${recipe.get('id')}`} recipe={recipe} like={likeRecipe} dislike={dislikeRecipe} />
              ))}
            </ul>
          ) : error ? (
            <ErrorLoading />
          ) : (
            <NoRecipes />
          )}
        </div>
      </div>
    );
  }
}

export default connect(({ list: { recipes, loading, loaded, error } }) => ({ recipes, loading, loaded, error }), {
  loadRecipes,
  likeRecipe,
  dislikeRecipe,
})(List);
