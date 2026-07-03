import FilmsListContainerView from '../view/films-list-container-view';
import FilmsTopListView from '../view/films-top-container';
import FilmCardPresenter from '../presenter/film-card-presenter';
import { render } from '../framework/render';
import { FILM__EXTRA__COUNT } from '../const';

export default class FilmsTopPresenter {
  #filmsContainer = null;
  #films = null;
  #comments = null;
  #onPopupOpen = null;
  #onDataChange = null;

  #filmsTopListContainer = new FilmsTopListView();
  #filmsTopContainer = new FilmsListContainerView();

  #renderedFilmExtraCount = FILM__EXTRA__COUNT;

  #filmCardPresenters = new Map();

  constructor ({ filmsContainer, films, comments, onPopupOpen, onDataChange }) {
    this.#filmsContainer = filmsContainer;
    // this.#films = films;
    this.#films = [...films].sort((filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);
    this.#comments = comments;
    this.#onPopupOpen = onPopupOpen;
    this.#onDataChange = onDataChange;
  }

  init() {
    if (this.#films.length === 0) {
      return;
    }

    render(this.#filmsTopContainer, this.#filmsTopListContainer.element);
    render(this.#filmsTopListContainer, this.#filmsContainer.element);

    for (let i = 0; i < Math.min(this.#films.length,this.#renderedFilmExtraCount); i += 1) {
      this.#renderExtraTopCard(this.#films[i]);
    }
  }

  #renderExtraTopCard(film) {
    if (this.#filmCardPresenters.has(film.id)) {
      return;
    }

    const filmCardPresenter = new FilmCardPresenter({
      listContainer: this.#filmsTopContainer,
      comments: this.#comments,
      onPopupOpen: this.#onPopupOpen,
      onDataChange: this.#onDataChange,
    });

    filmCardPresenter.init({ film });

    this.#filmCardPresenters.set(film.id, filmCardPresenter);
  }

  #clearTopFilmList() {
    this.#filmCardPresenters.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenters.clear();
  }

  updatedFilmCard(updatedFilm) {
    const targetPresenter = this.#filmCardPresenters.get(updatedFilm.id);

    if (targetPresenter) {
      targetPresenter.init({ film: updatedFilm });
    }
  }
}
