export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;

    this._data = data;

    const markup = this._generateMarkup();

    this._clearMarkup();
    this._insertMarkup(markup);
  }

  _insertMarkup(markup) {
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clearMarkup() {
    this._parentEl.innerHTML = '';
  }
}
