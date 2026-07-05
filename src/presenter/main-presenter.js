import FilmsPresenter from './films-presenter';
import FilmsTopPresenter from './films-top-presenter';
import FilmsMostPresenter from './films-most-presenter';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import FilmsContainerView from '../view/films-container-view';
import NoFilmsListView from '../view/no-films-list.view';
import { render, replace, remove } from '../framework/render';
import { generateFilter } from '../mock/mock-filter';
import { updateCard } from '../utils/common';
import { sortFilmsByDate, sortFilmsByRating } from '../utils/utils-film-card';
import { SortType } from '../const';

export default class MainPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #currentPopupPresenter = null;

  #filmsPresenter = null;
  #filmsTopPresenter = null;
  #filmsMostPresenter = null;

  #filmsContainer = new FilmsContainerView();
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];

  #films = [];
  #comments = [];
  #filters = null;

  constructor({ mainContainer, filmsModel, commentsModel }) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    this.#filters = generateFilter(this.#films);
    this.#sourcedFilms = [...this.#filmsModel.films];

    this.#filmsPresenter = new FilmsPresenter({
      filmsContainer: this.#filmsContainer,
      films: this.#films,
      comments: this.#comments,
      filters: this.#filters,
      onPopupOpen: this.#handlePopupOpen,
      onDataChange: this.#handleFilmChange,
    });

    this.#filmsTopPresenter = new FilmsTopPresenter({
      filmsContainer: this.#filmsContainer,
      films: this.#films,
      comments: this.#comments,
      onPopupOpen: this.#handlePopupOpen,
      onDataChange: this.#handleFilmChange,
    });

    this.#filmsMostPresenter = new FilmsMostPresenter({
      filmsContainer: this.#filmsContainer,
      films: this.#films,
      comments: this.#comments,
      onPopupOpen: this.#handlePopupOpen,
      onDataChange: this.#handleFilmChange,
    });

    render(new FiltersView({ filters: this.#filters }), this.#mainContainer);

    if (this.#films.length === 0) {
      this.#renderFilmsContainer();
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderFilmsContainer();

    this.#filmsPresenter.init();
    this.#filmsTopPresenter.init();
    this.#filmsMostPresenter.init();
  }

  #renderFilmsContainer() {
    render(this.#filmsContainer, this.#mainContainer);
  }

  #renderSort() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSort: this.#currentSortType,
    });

    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#mainContainer);
      return;
    }

    if (prevSortComponent !== null) {
      replace(this.#sortComponent, prevSortComponent);
    }

    remove(prevSortComponent);
  }

  #renderEmptyList() {
    render(new NoFilmsListView(), this.#filmsContainer.element);
  }

  #handlePopupOpen = (newPopupPresenter) => {
    if (this.#currentPopupPresenter) {
      this.#currentPopupPresenter.closePopup();
    }
    this.#currentPopupPresenter = newPopupPresenter;
  };

  #handleFilmChange = (updateFilm) => {
    this.#films = updateCard(this.#films, updateFilm);
    this.#sourcedFilms = updateCard(this.#sourcedFilms, updateFilm);

    if (this.#filmsPresenter) {
      this.#filmsPresenter.updatedFilmCard(updateFilm);
    }

    if (this.#filmsTopPresenter) {
      this.#filmsTopPresenter.updatedFilmCard(updateFilm);
    }

    if (this.#filmsMostPresenter) {
      this.#filmsMostPresenter.updatedFilmCard(updateFilm);
    }

    this.#renderSort();
  };

  #sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#films = sortFilmsByDate(this.#sourcedFilms);
        break;
      case SortType.RATING:
        this.#films = sortFilmsByRating(this.#sourcedFilms);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);

    if (this.#filmsPresenter) {
      this.#filmsPresenter.clearFilmList();
    }

    this.#filmsPresenter.init(this.#films);
    this.#renderSort();
  };
}
