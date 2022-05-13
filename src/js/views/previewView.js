import icons from 'url:../../img/icons.svg';

class PreviewView {
  generatePreview(data) {
    return `
      <li class="preview--js">
        <a href="#${data.id}" class="preview__link">
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
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
