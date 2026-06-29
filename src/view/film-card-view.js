import { createElement } from '../render';
import { truncateDescription, humanizeReleaseYear, getRunTimeFilm } from '../utils';

const createBtnControls = (isWatchlist, isWatched, isFavorite) => {
  const watchlistClassName = isWatchlist ? 'film-card__controls-item--active' : '';
  const watchedClassName = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = isFavorite ? 'film-card__controls-item--active' : '';

  return `
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  `;
};

const createTemplate = (film) => {
  const { comments, filmInfo } = film;
  const { title, totalRating, poster, release, runTime, genre, description, userDetails } = filmInfo;
  const { watchlist, alreadyWatched, favorite } = userDetails;

  const shortDescription = truncateDescription(description);
  const releaseYear = humanizeReleaseYear(release.date);
  const time = getRunTimeFilm(runTime);
  const btnList = createBtnControls(watchlist, alreadyWatched, favorite);

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${releaseYear}</span>
              <span class="film-card__duration">${time}</span>
              <span class="film-card__genre">${genre[0]}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${shortDescription}</p>
            <span class="film-card__comments">${comments.length} comments</span>
          </a>
          ${btnList}
        </article>`;
};

export default class FilmCardView {
  #film = null;

  constructor ({ film }) {
    this.#film = film;
  }

  getTemplate() {
    return createTemplate(this.#film);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
