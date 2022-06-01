class AddRecipeView {
  _parentEl = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _addRecipeWindow = document.querySelector('.add-recipe-window');
  _openModalBtn = document.querySelector('.nav__btn--recipe');
  _closeModalBtn = document.querySelector('.btn--close-modal');

  constructor() {
    this._addHandlerOpenModal();
    this._addHandlerCloseModal();
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      console.log(this), this._parentEl;
      // const dataArray = [...new FormData(this)];
      // handler();
    });
  }

  toggleModal() {
    this._addRecipeWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerOpenModal() {
    this._openModalBtn.addEventListener('click', e => {
      e.preventDefault();
      this.toggleModal();
    });
  }

  _addHandlerCloseModal() {
    this._closeModalBtn.addEventListener('click', e => {
      e.preventDefault();
      this.toggleModal();
    });
  }
}

export default new AddRecipeView();
