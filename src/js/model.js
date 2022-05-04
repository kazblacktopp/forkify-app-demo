import { async } from 'regenerator-runtime';
import { getJSON, setLocalStorage, getLocalStorage } from './helper.js';
import { API_URL, RESULTS_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: loadBookmarks(),
};

export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    state.recipe.bookmarked = state.bookmarks?.some(
      rec => rec.id === state.recipe.id
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

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

export function addBookmark() {
  state.recipe.bookmarked = true;
  state.bookmarks.push(state.recipe);
  setLocalStorage('bookmarks', state.bookmarks);
}

export function removeBookmark() {
  state.recipe.bookmarked = false;
  const recipeIndex = state.bookmarks.findIndex(
    rec => rec.id === state.recipe.id
  );
  if (recipeIndex !== -1) {
    state.bookmarks.splice(recipeIndex, 1);
  }
  setLocalStorage('bookmarks', state.bookmarks);
}

function loadBookmarks() {
  const bookmarksArray = getLocalStorage('bookmarks');
  return bookmarksArray ? bookmarksArray : [];
}
