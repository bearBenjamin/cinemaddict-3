import FilmsListContainerView from '../view/films-list-container-view';
import FilmsMostComentedListView from '../view/films-most-comented-container-view';
import FilmCardPresenter from './film-card-presenter';
import { render } from '../framework/render';
import { FILM__EXTRA__COUNT } from '../const';

export default class FilmsMostPresenter {
  #filmsContainer = null;
  #films = null;
  #comments = null;
  #onPopupOpen = null;
  #onDataChange = null;

  #filmsTopListContainer = new FilmsMostComentedListView();
  #filmsTopContainer = new FilmsListContainerView();

  #renderedFilmExtraCount = FILM__EXTRA__COUNT;

  #filmCardPresenters = new Map();

  constructor ({ filmsContainer, films, comments, onPopupOpen, onDataChange }) {
    this.#filmsContainer = filmsContainer;
    // this.#films = films;
    this.#films = [...films].sort((filmA, filmB) => filmB.comments.length - filmA.comments.length);
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
      this.#renderExtraMostCard(this.#films[i]);
    }
  }

  #renderExtraMostCard(film) {
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

  clearFilmList() {
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
