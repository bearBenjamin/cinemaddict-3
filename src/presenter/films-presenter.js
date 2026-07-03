import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import BtnShowMore from '../view/btn-show-more-view';
import FilmCardPresenter from './film-card-presenter';
import { render, remove } from '../framework/render';
import { FILM__COUNT__PER__STEP } from '../const';

export default class FilmsPresenter {
  #filmsContainer = null;
  #films = null;
  #comments = null;
  #filters = null;
  #btnShowMore = null;
  #onPopupOpen = null;
  #onDataChange = null;

  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();

  // #filmsModel = null;
  // #commentsModel = null;
  // #popupCardFilm = null;

  #renderedFilmCount = FILM__COUNT__PER__STEP;

  #filmCardPresenters = new Map();

  constructor({ filmsContainer, films, comments, filters, onPopupOpen, onDataChange }) {
    this.#filmsContainer = filmsContainer;
    this.#films = films;
    this.#comments = comments;
    this.#filters = filters;
    this.#onPopupOpen = onPopupOpen;
    this.#onDataChange = onDataChange;
  }

  init() {
    this.#renderListFilm();
  }

  #renderListFilm() {
    render(this.#filmsListContainer, this.#filmsList.element);
    render(this.#filmsList, this.#filmsContainer.element);

    for (let i = 0; i < Math.min(this.#films.length, FILM__COUNT__PER__STEP); i += 1) {
      this.#renderCard({ film: this.#films[i] });
    }

    if (this.#films.length > FILM__COUNT__PER__STEP) {
      this.#btnShowMore = new BtnShowMore({
        onClick: this.#handleBtnShowMoreClick,
      });
      render(this.#btnShowMore, this.#filmsList.element);
    }
  }

  #renderCard({ film }) {
    if (this.#filmCardPresenters.has(film.id)) {
      return;
    }

    const filmCardPresenter = new FilmCardPresenter({
      listContainer: this.#filmsListContainer,
      comments: this.#comments,
      onPopupOpen: this.#onPopupOpen,
      onDataChange: this.#onDataChange,
    });

    filmCardPresenter.init({ film });

    this.#filmCardPresenters.set(film.id, filmCardPresenter);
  }

  #clearFilmList() {
    this.#filmCardPresenters.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenters.clear();

    this.#renderedFilmCount = FILM__COUNT__PER__STEP;
    remove(this.#btnShowMore);
  }

  updatedFilmCard(updatedFilm) {
    const targetPresenter = this.#filmCardPresenters.get(updatedFilm.id);

    if (targetPresenter) {
      targetPresenter.init({ film: updatedFilm });
    }
  }

  #handleBtnShowMoreClick = () => {
    this.#films
      .slice(
        this.#renderedFilmCount,
        this.#renderedFilmCount + FILM__COUNT__PER__STEP,
      )
      .forEach((film) => this.#renderCard({ film }));
    this.#renderedFilmCount += FILM__COUNT__PER__STEP;
    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#btnShowMore);
    }
  };
}
