import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import BtnShowMore from '../view/btn-show-more-view';
import FilmCardPresenter from './film-card-presenter';
import { render, remove } from '../framework/render';
import { FILM__COUNT__PER__STEP } from '../const';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #onPopupOpen = null;

  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();

  #films = null;
  #comments = null;
  #filters = null;
  #btnShowMore = null;
  #popupCardFilm = null;

  #renderedFilmCount = FILM__COUNT__PER__STEP;

  constructor({ filmsContainer, films, comments, filters, onPopupOpen }) {
    this.#filmsContainer = filmsContainer;
    this.#films = films;
    this.#comments = comments;
    this.#filters = filters;
    this.#onPopupOpen = onPopupOpen;
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
    const filmCardPresenter = new FilmCardPresenter({
      listContainer: this.#filmsListContainer,
      comments: this.#comments,
      onPopupOpen: this.#onPopupOpen
    });

    filmCardPresenter.init({ film });
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
