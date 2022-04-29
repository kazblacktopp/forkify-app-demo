import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', e => {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }

  _generateMarkup(data) {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currentPage === 1 && numPages > 1) {
      return this._generateNextBtnMarkup(currentPage);
    }

    if (currentPage === numPages && numPages > 1) {
      return this._generatePreviousBtnMarkup(currentPage);
    }

    if (currentPage !== 1 && currentPage < numPages) {
      return (
        this._generatePreviousBtnMarkup(currentPage) +
        this._generateNextBtnMarkup(currentPage)
      );
    }

    return '';
  }

  _generateNextBtnMarkup(curPage) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        curPage + 1
      }">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generatePreviousBtnMarkup(curPage) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        curPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();
