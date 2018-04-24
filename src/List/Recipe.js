import React from 'react';
import PT from 'prop-types';
import s from './Recipe.scss';
import cx from 'classnames';

const handleButtonClick = action => e => {
  e.preventDefault();
  action();
};

const Recipe = ({ recipe, like, dislike }) => {
  return (
    <li className={cx(s.Recipe)}>
      <h3>{recipe.get('title')}</h3>
      <p>{recipe.get('text')}</p>
      {recipe.get('drawing') && (
        <div>
          <img alt="drawing" width="130px" src={recipe.get('drawing')} />
        </div>
      )}
      <div>
        <span className={s.rating}>Rating: {recipe.get('rating')}</span>
        <button className={s.rateBut} onClick={handleButtonClick(() => like(recipe.get('id'), recipe.get('rating')))}>
          <span role="img" aria-label="like">
            👍
          </span>
        </button>
        <button
          className={s.rateBut}
          onClick={handleButtonClick(() => dislike(recipe.get('id'), recipe.get('rating')))}
        >
          <span role="img" aria-label="dislike">
            👎
          </span>
        </button>
      </div>
    </li>
  );
};

Recipe.propTypes = {
  recipe: PT.object.isRequired,
  like: PT.func.isRequired,
  dislike: PT.func.isRequired,
};

export default Recipe;
