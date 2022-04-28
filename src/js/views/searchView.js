class SearchView {
  _parentEl = document.querySelector('.search');
  _errorMessage = 'Unable to find results for that search term.';

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const inputField = this._parentEl.querySelector('.search__field');
    const query = inputField.value;
    this._clearInput(inputField);
    return query;
  }

  _clearInput(inputField) {
    inputField.value = '';
  }
}

export default new SearchView();
