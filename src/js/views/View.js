import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clearMarkup();
    this._insertMarkup(markup);
  }

  render(data) {
    try {
      if (!data || (Array.isArray(data) && data.length === 0))
        throw new Error(this._errorMessage);

      this._data = data;

      const markup = this._generateMarkup();

      this._clearMarkup();
      this._insertMarkup(markup);
    } catch (err) {
      throw err;
    }
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newElements = document
      .createRange()
      .createContextualFragment(newMarkup)
      .querySelectorAll('*');
    const curElements = this._parentEl.querySelectorAll('*');

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg class="message__icon">
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p class="message__text">
          ${message}
        </p>
      </div>
    `;

    this._clearMarkup();
    this._insertMarkup(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg class="error__icon">
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p class="error__text">
          ${message}
        </p>
      </div>
    `;

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
