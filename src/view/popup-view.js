import AbstractView from "../framework/view/abstract-view";
import {
  humanizeReleaseDate,
  getRunTimeFilm,
  getCurrentComments,
  humanizeCommentDate,
} from "../utils/utils-film-card";

const createCommentsList = (data, comments) => {
  const currentComments = getCurrentComments(data, comments);

  const listComments = currentComments
    .map((currentComment) => {
      const dateComment = humanizeCommentDate(currentComment.date);
      return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${currentComment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${currentComment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${currentComment.author}</span>
                <span class="film-details__comment-day">${dateComment}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
    })
    .join("");
  return `<ul class="film-details__comments-list">
    ${listComments}</ul>`;
};

const createBtnControls = (isWatchlist, isWatched, isFavorite) => {
  const watchlistClassName = isWatchlist
    ? "film-card__controls-item--active"
    : "";
  const watchedClassName = isWatched ? "film-card__controls-item--active" : "";
  const favoriteClassName = isFavorite
    ? "film-card__controls-item--active"
    : "";

  return `
    <section class="film-details__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </section>
  `;
};

const createListGenre = (genres) => {
  const genresTemplate = genres
    .map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join(" ");

  return `<td class="film-details__cell">${genresTemplate}</td>`;
};

const createTemplate = (film, commentsData) => {
  const { comments, filmInfo } = film;
  const {
    title,
    alternativeTitle,
    totalRating,
    poster,
    ageRating,
    director,
    writers,
    actors,
    release,
    runTime,
    genre,
    description,
    userDetails,
  } = filmInfo;
  const { watchlist, alreadyWatched, favorite } = userDetails;

  const releaseDate = humanizeReleaseDate(release.date);
  const time = getRunTimeFilm(runTime);
  const genreStr = genre.length > 1 ? "Genres" : "Genre";
  const listCenres = createListGenre(genre);
  const btnList = createBtnControls(watchlist, alreadyWatched, favorite);
  const commentsList = createCommentsList(commentsData, comments);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(", ")}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(", ")}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${time}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.realeseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreStr}</td>
              ${listCenres}
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      ${btnList}
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        ${commentsList}

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>
`;
};

export default class PopupView extends AbstractView {
  #film = null;
  #comments = null;
  #handleBtnCloseClick = null;

  constructor({ film, comments, onClickBtnClose }) {
    super();
    this.#film = film;
    this.#comments = comments;
    this.#handleBtnCloseClick = onClickBtnClose;
    this.element
      .querySelector(".film-details__close-btn")
      .addEventListener("click", this.#btnCloseClickHandler);
  }

  get template() {
    return createTemplate(this.#film, this.#comments);
  }

  #btnCloseClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleBtnCloseClick();
  };
}
