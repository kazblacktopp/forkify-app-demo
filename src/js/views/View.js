export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._insertMarkup(markup);
  }

  _insertMarkup(markup) {
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
