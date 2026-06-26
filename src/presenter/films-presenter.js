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

export default class FilmsPresenter {
  #mainContainer = null;
  #filterComponent = new FiltersView();
  #sortComponent = new SortView();
  #filmsContainer = new FilmsContainerView();
  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();
  #filmsTopListContainer = new FilmsTopListView();
  #filmsTopContainer = new FilmsListContainerView();
  #filmsMostComentedListContainer = new FilmsMostComentedListView();
  #filmsMostComentedContainer = new FilmsListContainerView();

  constructor({mainContainer}) {
    this.#mainContainer = mainContainer;
  }

  init() {
    render(this.#filterComponent, this.#mainContainer);
    render(this.#sortComponent, this.#mainContainer);

    for (let i = 0; i < 5; i += 1) {
      render(new FilmCardView(), this.#filmsListContainer.getElement());
    }

    render(this.#filmsListContainer, this.#filmsList.getElement());
    render(new BtnShowMore(), this.#filmsList.getElement());
    render(this.#filmsList, this.#filmsContainer.getElement());

    for (let i = 0; i < 2; i += 1) {
      render(new FilmCardView(), this.#filmsTopContainer.getElement());
      render(new FilmCardView(), this.#filmsMostComentedContainer.getElement());
    }

    render(this.#filmsTopContainer, this.#filmsTopListContainer.getElement());
    render(this.#filmsMostComentedContainer, this.#filmsMostComentedListContainer.getElement());
    render(this.#filmsTopListContainer, this.#filmsContainer.getElement());
    render(this.#filmsMostComentedListContainer, this.#filmsContainer.getElement());

    render(this.#filmsContainer, this.#mainContainer);
  }
}
