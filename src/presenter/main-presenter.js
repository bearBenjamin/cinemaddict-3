import FilmsPresenter from './films-presenter';
import FilmsTopPresenter from './films-top-presenter';
import FilmsMostPresenter from './films-most-presenter';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import FilmsContainerView from '../view/films-container-view';
import NoFilmsListView from '../view/no-films-list.view';
import { render } from '../framework/render';
import { generateFilter } from '../mock/mock-filter';
import { updateCard } from '../utils/common';

export default class MainPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #currentPopupPresenter = null;

  #filmsPresenter = null;
  #filmsTopPresenter = null;
  #filmsMostPresenter = null;

  #filmsContainer = new FilmsContainerView();
  #sortComponent = new SortView();

  #films = [];
  #comments = [];
  #filters = null;

  constructor ({ mainContainer, filmsModel, commentsModel }) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    this.#filters = generateFilter(this.#films);

    this.#filmsPresenter = new FilmsPresenter ({
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
      render(this.#filmsContainer, this.#mainContainer);
      render(new NoFilmsListView(), this.#filmsContainer.element);
      return;
    }

    render(this.#sortComponent, this.#mainContainer);
    render(this.#filmsContainer, this.#mainContainer);

    this.#filmsPresenter.init();
    this.#filmsTopPresenter.init();
    this.#filmsMostPresenter.init();
  }

  #handlePopupOpen = (newPopupPresenter) => {
    if (this.#currentPopupPresenter) {
      this.#currentPopupPresenter.closePopup();
    }
    this.#currentPopupPresenter = newPopupPresenter;
  };

  #handleFilmChange = (updateFilm) => {
    this.#films = updateCard(this.#films, updateFilm);

    if (this.#filmsPresenter) {
      this.#filmsPresenter.updatedFilmCard(updateFilm);
    }

    if (this.#filmsTopPresenter) {
      this.#filmsTopPresenter.updatedFilmCard(updateFilm);
    }

    if (this.#filmsMostPresenter) {
      this.#filmsMostPresenter.updatedFilmCard(updateFilm);
    }
  };
}
