import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';
import { render, remove, replace } from '../framework/render';

export default class FilmCardPresenter {
  #listContainer = null;

  #cardFilmComponent = null;

  #film = null;
  #comments = null;
  #popupFilm = null;
  #onPopupOpen = null;
  #onDataChange = null;

  constructor ({ listContainer, comments, onPopupOpen, onDataChange }) {
    this.#listContainer = listContainer;
    this.#comments = comments;
    this.#onPopupOpen = onPopupOpen;
    this.#onDataChange = onDataChange;
  }

  init({ film }) {
    this.#film = film;

    const prevCardFilmComponent = this.#cardFilmComponent;

    this.#cardFilmComponent = new FilmCardView({
      film: this.#film,
      onClickCard: () => {
        this.#openPopup(film);
      },
      onClickWatchlistBtnCard: this.#handleWatchListBtnClick,
      onClickWatchedBtnCard: this.#handleWatchedBtnClick,
      onClickFavoriteBtnCard: this.#handleFavoriteBtnClick,
    });

    if (prevCardFilmComponent === null) {
      render(this.#cardFilmComponent, this.#listContainer.element);
      return;
    }

    if (this.#listContainer.element.contains(prevCardFilmComponent.element)) {
      replace(this.#cardFilmComponent, prevCardFilmComponent);
    }

    const prevPopupComponent = this.#popupFilm;

    if (prevPopupComponent !== null) {

      this.#popupFilm = new PopupView({
        film: this.#film,
        comments: this.#comments,
        onClickBtnClose: () => this.closePopup(),
        onClickWatchlistBtnCard: this.#handleWatchListBtnClick,
        onClickWatchedBtnCard: this.#handleWatchedBtnClick,
        onClickFavoriteBtnCard: this.#handleFavoriteBtnClick
      });

      replace(this.#popupFilm, prevPopupComponent);
      remove(prevPopupComponent);
    }

    remove(prevCardFilmComponent);
  }

  destroy() {
    remove(this.#cardFilmComponent);

    if (this.#popupFilm !== null) {
      this.closePopup();
    }
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
      onClickWatchlistBtnCard: this.#handleWatchListBtnClick,
      onClickWatchedBtnCard: this.#handleWatchedBtnClick,
      onClickFavoriteBtnCard: this.#handleFavoriteBtnClick
    });

    render(this.#popupFilm, document.body);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleWatchListBtnClick = () => {
    this.#onDataChange({
      ...this.#film,
      filmInfo: {
        ...this.#film.filmInfo,
        userDetails: {
          ...this.#film.filmInfo.userDetails,
          watchlist: !this.#film.filmInfo.userDetails.watchlist
        }
      }
    });
  };

  #handleWatchedBtnClick = () => {
    this.#onDataChange({
      ...this.#film,
      filmInfo: {
        ...this.#film.filmInfo,
        userDetails: {
          ...this.#film.filmInfo.userDetails,
          alreadyWatched: !this.#film.filmInfo.userDetails.alreadyWatched // <-- Исправлена опечатка в имени флага
        }
      }
    });
  };

  #handleFavoriteBtnClick = () => {
    this.#onDataChange({
      ...this.#film,
      filmInfo: {
        ...this.#film.filmInfo,
        userDetails: {
          ...this.#film.filmInfo.userDetails,
          favorite: !this.#film.filmInfo.userDetails.favorite
        }
      }
    });
  };
}
