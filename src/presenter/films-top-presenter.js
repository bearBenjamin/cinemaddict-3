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

  #renderedFilmExtraCount = FILM__EXTRA__COUNT;

  #filmsTopListContainer = new FilmsTopListView();
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
      this.#renderExtraTopCard(this.#films[i]);
    }
  }

  #renderExtraTopCard(film) {
    const filmCardPresenter = new FilmCardPresenter({
      listContainer: this.#filmsTopContainer,
      comments: this.#comments,
      onPopupOpen: this.#onPopupOpen
    });

    filmCardPresenter.init({ film });
  }
}
