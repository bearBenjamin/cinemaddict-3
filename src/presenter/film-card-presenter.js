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

  #popupViewData = {
    emotion: null,
    comment: null,
    scrollPosition: 0
  };

  constructor ({ listContainer, comments, onPopupOpen, onDataChange }) {
    this.#listContainer = listContainer;
    this.#comments = comments;
    this.#onPopupOpen = onPopupOpen;
    this.#onDataChange = onDataChange;
  }

  init({ film }) {
    this.#film = film;

    const prevCardFilmComponent = this.#cardFilmComponent;
    const prevPopupComponent = this.#popupFilm;

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

    if (prevPopupComponent !== null) {

      this.#popupFilm = new PopupView({
        film: this.#film,
        comments: this.#comments,
        viewData: this.#popupViewData,
        updateViewData: this.#updatePopupViewData,
        onClickBtnClose: () => this.closePopup(),
        onClickWatchlistBtnCard: this.#handleWatchListBtnClick,
        onClickWatchedBtnCard: this.#handleWatchedBtnClick,
        onClickFavoriteBtnCard: this.#handleFavoriteBtnClick
      });

      replace(this.#popupFilm, prevPopupComponent);
      this.#popupFilm.saveScrollPosition();
      remove(prevPopupComponent);
    }

    // if (prevPopupComponent !== null) {
    //   this.#popupFilm.updateControls(this.#film.filmInfo.userDetails);
    // }

    remove(prevCardFilmComponent);
  }

  #updatePopupViewData = (viewData) => {
    this.#popupViewData = {...viewData};
  };

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

    this.#popupViewData = { emotion: null, comment: null, scrollPosition: 0 };

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
      viewData: this.#popupViewData,
      updateViewData: this.#updatePopupViewData,
      onClickBtnClose: () => {
        this.closePopup();
      },
      onClickWatchlistBtnCard: this.#handleWatchListBtnClick,
      onClickWatchedBtnCard: this.#handleWatchedBtnClick,
      onClickFavoriteBtnCard: this.#handleFavoriteBtnClick
    });

    render(this.#popupFilm, document.body);
    this.#popupFilm.saveScrollPosition();

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleWatchListBtnClick = () => {
    const updatedUserDetails = {
      ...this.#film.filmInfo.userDetails,
      watchlist: !this.#film.filmInfo.userDetails.watchlist
    };

    this.#onDataChange({
      ...this.#film,
      filmInfo: {
        ...this.#film.filmInfo,
        userDetails: updatedUserDetails
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
          alreadyWatched: !this.#film.filmInfo.userDetails.alreadyWatched
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
