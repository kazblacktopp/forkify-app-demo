import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    searchResultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
}

function controlPagination(goToPage) {
  searchResultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

function controlBookmarks() {
  if (model.state.recipe.bookmarked) model.removeBookmark();
  else model.addBookmark();
  recipeView.update(model.state.recipe);
}

function init() {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
}

init();
