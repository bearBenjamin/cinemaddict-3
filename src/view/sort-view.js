import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const';

const createTemplate = (currentSortType) => `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;

export default class SortView extends AbstractView {
  #handleSortType = null;
  #currentSort = null;

  constructor({ onSortTypeChange, currentSort }) {
    super();
    this.#handleSortType = onSortTypeChange;
    this.#currentSort = currentSort;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTemplate(this.#currentSort);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#handleSortType(evt.target.dataset.sortType);
  };
}
