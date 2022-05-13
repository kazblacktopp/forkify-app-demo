import View from './View.js';
import previewView from './previewView.js';

class SearchResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';

  _generateMarkup() {
    return this._data.map(previewView.generatePreview).join('');
  }
}

export default new SearchResultsView();
