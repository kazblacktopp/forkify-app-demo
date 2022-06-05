import { AJAX, setLocalStorage, getLocalStorage } from './helper.js';
import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config.js';

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

function loadBookmarks() {
  const bookmarksArray = getLocalStorage('bookmarks');
  return bookmarksArray ? bookmarksArray : [];
}

export async function loadRecipe(id) {
  try {
    const data = await AJAX(`${API_URL}${id}`);

    state.recipe = createRecipeObject(data);
    state.recipe.bookmarked = state.bookmarks?.some(
      rec => rec.id === state.recipe.id
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function createRecipeObject(data) {
  const { recipe } = data.data;

  const recipeObj = {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
  return recipeObj;
}

export async function loadSearchResults(query) {
  try {
    const url = `${API_URL}?search=${query}&key=${API_KEY}`;
    const data = await AJAX(url);
    state.search.query = query;

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
        ...(rec.key && { key: rec.key }),
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

export function adjustServings(servings) {
  const newIngredients = state.recipe.ingredients.map(ing => {
    const quantPerServe = ing.quantity / state.recipe.servings;
    const newQuantity = quantPerServe * servings;
    return {
      quantity: newQuantity,
      unit: ing.unit,
      description: ing.description,
    };
  });
  state.recipe.ingredients = newIngredients;
  state.recipe.servings = +servings;
}

export async function uploadRecipe(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(entry => {
        const ingArray = entry[1].split(',').map(el => el.trim());

        if (ingArray.length !== 3)
          throw new Error(
            'Wrong ingredient format. Please enter ingredient quantity, unit and description separated by a comma.'
          );

        const [quantity, unit, description] = ingArray;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark();
  } catch (err) {
    console.error(err);
  }
}
