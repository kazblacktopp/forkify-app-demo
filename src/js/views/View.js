export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;

    this._data = data;

    const markup = this._generateMarkup();

    this._clearMarkup();
    this._insertMarkup(markup);
  }

  update(data) {
    this._data = data;
    const markup = this._generateMarkup();
    const newElements = document
      .createRange()
      .createContextualFragment(markup)
      .querySelectorAll('*');
    const curElements = this._parentEl.querySelectorAll('*');
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (!newEl.isEqualNode(curEl)) {
        curEl.innerHTML = newEl.innerHTML;
      }
    });
  }

  _insertMarkup(markup) {
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clearMarkup() {
    this._parentEl.innerHTML = '';
  }
}
