import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    bookmarksView.update(model.state.bookmarks);
    searchResultsView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError(err.message);
  }
}

async function controlSearchResults() {
  try {
    searchResultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    searchResultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    searchResultsView.renderError(err.message);
  }
}

function controlPagination(goToPage) {
  searchResultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

function controlBookmarks() {
  try {
    if (model.state.recipe.bookmarked) model.removeBookmark();
    else model.addBookmark();
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    bookmarksView.renderMessage(err.message);
  }
}

function controlServings(servings) {
  if (!servings || servings < 1) return;
  model.adjustServings(servings);
  recipeView.update(model.state.recipe);
}

async function controlAddRecipe() {
  console.log('New recipe uploaded');
}

function init() {
  recipeView.renderMessage();
  if (
    model.state.bookmarks &&
    Array.isArray(model.state.bookmarks) &&
    model.state.bookmarks.length !== 0
  ) {
    bookmarksView.render(model.state.bookmarks);
  } else {
    bookmarksView.renderMessage();
  }
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerBookmark(controlBookmarks);
  recipeView.addHanderServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
