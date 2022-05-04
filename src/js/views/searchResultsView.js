import View from './View.js';

class SearchResultsView extends View {
  _parentEl = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(this._generateSearchResults).join('');
  }

  _generateSearchResults(result) {
    return `
      <li class="preview--js">
        <a href="#${result.id}" class="preview__link">
          <figure class="preview__fig">
            <img
              src="${result.image}"
              class="preview__img"
              alt="${result.title}"
            />
          </figure>

          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new SearchResultsView();
