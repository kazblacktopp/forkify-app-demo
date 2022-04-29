import { async } from 'regenerator-runtime';
import { getJSON } from './helper.js';
import { API_URL, RESULTS_PER_PAGE } from './config.js';

export const state = {
  search: {
    query: '',
    results: [],
    page: 1,
    numResultsPages: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};

export async function loadSearchResults(query) {
  try {
    const url = `${API_URL}?search=${query}`;
    const data = await getJSON(url);
    state.search.query = query;

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const finish = page * state.search.resultsPerPage;
  const results = state.search.results.slice(start, finish);
  return results;
}
