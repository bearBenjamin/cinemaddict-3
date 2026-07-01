import AbstractView from '../framework/view/abstract-view';

const createTemplate = () => `<button class="films-list__show-more">
Show more</button>`;

export default class BtnShowMore extends AbstractView {
  #handleBtnShowMoreClick = null;

  constructor ({ onClick }) {
    super();
    this.#handleBtnShowMoreClick = onClick;
    this.element.addEventListener('click', this.#clickBtnShowMoreHandle);
  }

  get template() {
    return createTemplate();
  }

  #clickBtnShowMoreHandle = (evt) => {
    evt.preventDefault();
    this.#handleBtnShowMoreClick();
  };
}
