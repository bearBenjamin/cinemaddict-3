import ProfileView from '../view/profile-view';
import { render } from '../framework/render';

export default class HederPresenter {
  #headerContainer = null;
  #currentStatus = null;
  #profileComponent = null;

  constructor({ header, currentStatus }) {
    this.#headerContainer = header;
    this.#currentStatus = currentStatus;
  }

  init() {
    this.#profileComponent = new ProfileView({ currentStatus: this.#currentStatus });

    render(this.#profileComponent, this.#headerContainer);
  }
}
