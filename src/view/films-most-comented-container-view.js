import { createElement } from '../render';

const createTemplate = () => `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      </section>`;

export default class FilmsMostComentedListView {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
