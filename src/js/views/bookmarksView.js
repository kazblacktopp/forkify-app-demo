import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = `No bookmarks yet. Find a nice recipe and bookmark it :)`;

  _generateMarkup() {
    return this._data.map(previewView.generatePreview).join('');
  }
}

export default new BookmarksView();
