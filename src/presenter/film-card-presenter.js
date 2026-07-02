import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';
import { render, remove } from '../framework/render';

export default class FilmCardPresenter {
  #listContainer = null;

  #cardFilmComponent = null;

  #film = null;
  #comments = null;
  #popupFilm = null;
  #onPopupOpen = null;

  constructor ({ listContainer, comments, onPopupOpen }) {
    this.#listContainer = listContainer;
    this.#comments = comments;
    this.#onPopupOpen = onPopupOpen;
  }

  init({ film }) {
    this.#film = film;

    this.#cardFilmComponent = new FilmCardView({
      film: this.#film,
      onClickCard: () => {
        this.#openPopup(film);
      },
    });

    render(this.#cardFilmComponent, this.#listContainer.element);
  }

  closePopup = () => {
    if (this.#popupFilm === null) {
      return;
    }

    remove(this.#popupFilm);
    this.#popupFilm = null;

    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
  };

  #openPopup = (film) => {
    this.#onPopupOpen(this);

    if (this.#popupFilm !== null) {
      this.closePopup();
    }

    this.#popupFilm = new PopupView({
      film,
      comments: this.#comments,
      onClickBtnClose: () => {
        this.closePopup();
      },
    });

    render(this.#popupFilm, document.body);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

}
