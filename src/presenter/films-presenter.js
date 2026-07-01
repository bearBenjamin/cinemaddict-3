import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import BtnShowMore from '../view/btn-show-more-view';
import FilmsTopListView from '../view/films-top-container';
import FilmsMostComentedListView from '../view/films-most-comented-container-view';
import NoFilmsListView from '../view/no-films-list.view';
import PopupView from '../view/popup-view';
import { render, remove } from '../framework/render';
import { generateFilter } from '../mock/mock-filter';

const FILM__EXTRA__COUNT = 2;
const FILM__COUNT__PER__STEP = 5;

export default class FilmsPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  // #filterComponent = new FiltersView();
  #sortComponent = new SortView();
  #filmsContainer = new FilmsContainerView();
  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();

  #films = null;
  #comments = null;
  #filters = null;
  #btnShowMore = null;
  #popupCardFilm = null;

  #renderedFilmCount = FILM__COUNT__PER__STEP;

  #filmsTopListContainer = new FilmsTopListView();
  #filmsTopContainer = new FilmsListContainerView();
  #filmsMostComentedListContainer = new FilmsMostComentedListView();
  #filmsMostComentedContainer = new FilmsListContainerView();

  constructor({ mainContainer, filmsModel, commentsModel }) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    this.#filters = generateFilter(this.#films);

    this.#renderListFilm();
    this.#renderExtraListFilm();
  }

  #renderListFilm() {
    this.#renderFilter();

    if (this.#films.length === 0) {
      render(this.#filmsContainer, this.#mainContainer);
      render(new NoFilmsListView(), this.#filmsContainer.element);
      return;
    }

    this.#renderSort();

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

    render(this.#filmsContainer, this.#mainContainer);
  }

  #renderFilter() {
    render(new FiltersView({ filters: this.#filters }), this.#mainContainer);
  }

  #renderSort() {
    render(this.#sortComponent, this.#mainContainer);
  }

  #renderCard({ film }) {
    const cardFilm = new FilmCardView({
      film,
      onClickCard: () => {
        this.#openPopup(film);
      },
    });

    render(cardFilm, this.#filmsListContainer.element);
  }

  #renderExtraListFilm() {
    for (let i = 0; i < FILM__EXTRA__COUNT; i += 1) {
      render(
        new FilmCardView({ film: this.#films[i] }),
        this.#filmsTopContainer.element,
      );
      render(
        new FilmCardView({ film: this.#films[i] }),
        this.#filmsMostComentedContainer.element,
      );
    }

    render(this.#filmsTopContainer, this.#filmsTopListContainer.element);
    render(
      this.#filmsMostComentedContainer,
      this.#filmsMostComentedListContainer.element,
    );
    render(this.#filmsTopListContainer, this.#filmsContainer.element);
    render(this.#filmsMostComentedListContainer, this.#filmsContainer.element);

  }

  #closePopup = () => {
    if (this.#popupCardFilm === null) {
      return;
    }

    remove(this.#popupCardFilm);
    this.#popupCardFilm = null;

    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #openPopup = (film) => {
    if (this.#popupCardFilm !== null) {
      this.#closePopup();
    }

    this.#popupCardFilm = new PopupView({
      film,
      comments: this.#comments,
      onClickBtnClose: () => {
        this.#closePopup();
      },
    });

    render(this.#popupCardFilm, document.body);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

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
