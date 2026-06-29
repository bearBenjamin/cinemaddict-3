import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import { render } from '../render';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import BtnShowMore from '../view/btn-show-more-view';
import FilmsTopListView from '../view/films-top-container';
import FilmsMostComentedListView from '../view/films-most-comented-container-view';
import PopupView from '../view/popup-view';

const FILM__EXTRA__COUNT = 2;

export default class FilmsPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterComponent = new FiltersView();
  #sortComponent = new SortView();
  #filmsContainer = new FilmsContainerView();
  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();
  #filmsTopListContainer = new FilmsTopListView();
  #filmsTopContainer = new FilmsListContainerView();
  #filmsMostComentedListContainer = new FilmsMostComentedListView();
  #filmsMostComentedContainer = new FilmsListContainerView();

  constructor({mainContainer, filmsModel, commentsModel}) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    render(this.#filterComponent, this.#mainContainer);
    render(this.#sortComponent, this.#mainContainer);

    const films = [...this.#filmsModel.getFilms()];
    const comments = [...this.#commentsModel.getComments()];

    for (let i = 0; i < films.length; i += 1) {
      render(new FilmCardView({ film: films[i] }), this.#filmsListContainer.getElement());
    }

    render(this.#filmsListContainer, this.#filmsList.getElement());
    render(new BtnShowMore(), this.#filmsList.getElement());
    render(this.#filmsList, this.#filmsContainer.getElement());

    render(new PopupView({ film: films[0], comments: comments }), this.#mainContainer.parentElement);

    for (let i = 0; i < FILM__EXTRA__COUNT; i += 1) {
      render(new FilmCardView({ film: films[i] }), this.#filmsTopContainer.getElement());
      render(new FilmCardView( {film: films[i] }), this.#filmsMostComentedContainer.getElement());
    }

    render(this.#filmsTopContainer, this.#filmsTopListContainer.getElement());
    render(this.#filmsMostComentedContainer, this.#filmsMostComentedListContainer.getElement());
    render(this.#filmsTopListContainer, this.#filmsContainer.getElement());
    render(this.#filmsMostComentedListContainer, this.#filmsContainer.getElement());

    render(this.#filmsContainer, this.#mainContainer);
  }
}
