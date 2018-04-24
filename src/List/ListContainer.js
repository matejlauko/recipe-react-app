import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadRecipes, likeRecipe, dislikeRecipe } from './actions';
import List, { RecipesLoader, NoRecipes, ErrorLoading, RecipeList } from './List';

class ListContainer extends Component {
  componentDidMount() {
    this.props.loadRecipes();
  }

  render() {
    const { loading, loaded, recipes, error } = this.props;

    const render = loading ? (
      <RecipesLoader />
    ) : loaded && recipes.size ? (
      <RecipeList recipes={recipes} likeRecipe={this.props.likeRecipe} dislikeRecipe={this.props.dislikeRecipe} />
    ) : error ? (
      <ErrorLoading loadRecipes={this.props.loadRecipes} />
    ) : (
      <NoRecipes />
    );

    return <List render={render} match={this.props.match} />;
  }
}

export default connect(({ list: { recipes, loading, loaded, error } }) => ({ recipes, loading, loaded, error }), {
  loadRecipes,
  likeRecipe,
  dislikeRecipe,
})(ListContainer);
