import icons from 'url:../../img/icons.svg';

class PreviewView {
  generatePreview(data) {
    const curRecipeID = window.location.hash.slice(1);
    const active = data.id === curRecipeID ? true : false;
    return `
      <li class="preview--js">
        <a href="#${data.id}" class="preview__link ${
      active ? 'preview__link--active' : ''
    }">
          <figure class="preview__fig">
            <img
              src="${data.image}"
              class="preview__img"
              alt="${data.title}"
            />
          </figure>

          <div class="preview__data">
            <h4 class="preview__title">${data.title}</h4>
            <p class="preview__publisher">${data.publisher}</p>
              ${
                data.key
                  ? `
                      <div class="preview__user-generated">
                        <svg>
                          <use href="${icons}#icon-user"></use>
                        </svg>
                      </div>
                    `
                  : ``
              }
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
