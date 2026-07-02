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

  #renderedFilmExtraCount = FILM__EXTRA__COUNT;

  #filmsTopListContainer = new FilmsMostComentedListView();
  #filmsTopContainer = new FilmsListContainerView();

  constructor ({ filmsContainer, films, comments, onPopupOpen }) {
    this.#filmsContainer = filmsContainer;
    this.#films = films;
    this.#comments = comments;
    this.#onPopupOpen = onPopupOpen;
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
    const filmCardPresenter = new FilmCardPresenter({
      listContainer: this.#filmsTopContainer,
      comments: this.#comments,
      onPopupOpen: this.#onPopupOpen
    });

    filmCardPresenter.init({ film });
  }
}
