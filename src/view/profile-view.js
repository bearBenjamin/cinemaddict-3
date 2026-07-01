import AbstractView from '../framework/view/abstract-view';

const createTemplate = (currentStatus) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${currentStatus}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class ProfileView extends AbstractView {
  #currentStatus = null;

  constructor({ currentStatus }) {
    super();
    this.#currentStatus = currentStatus;
  }

  get template() {
    return createTemplate(this.#currentStatus);
  }
}
