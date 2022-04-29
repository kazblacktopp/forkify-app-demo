import { async } from 'regenerator-runtime';
import * as model from './model.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';

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

function init() {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
}

init();
