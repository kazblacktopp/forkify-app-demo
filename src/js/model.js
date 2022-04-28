import { async } from 'regenerator-runtime';
import { getJSON } from './helper.js';

export const state = {
  search: {
    query: '',
    results: [],
  },
};

export async function loadSearchResults(query) {
  try {
    const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`;
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
    console.log(state.search.results);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
