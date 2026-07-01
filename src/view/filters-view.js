import AbstractView from '../framework/view/abstract-view';

const createTemplateFilterCount = (filter) => {
  const { name, count } = filter;
  let itemFilter;

  if (name === 'all') {
    itemFilter = `<a href="#all" class="main-navigation__item main-navigation__item--active">
                  All movies
                  </a>`;
    return itemFilter;
  }

  itemFilter = `<a href="#watchlist" class="main-navigation__item">
                ${name}
                <span class="main-navigation__item-count">
                ${count}
                </span>
               </a>`;

  return itemFilter;
};

const createTemplate = (filters) => {
  const filterItemsTemplate = filters.map((filter) => createTemplateFilterCount(filter)).join('');
  return `<nav class="main-navigation">
          ${filterItemsTemplate}
          </nav>`;
};

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor ({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTemplate(this.#filters);
  }
}
