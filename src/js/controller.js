import { async } from 'regenerator-runtime';
import * as model from './model.js';
import searchView from './views/searchView.js';

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
  } catch (err) {
    console.error(err);
  }
}

function init() {
  searchView.addHandlerSearch(controlSearchResults);
}

init();
