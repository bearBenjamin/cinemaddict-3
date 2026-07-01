import { generateFilm } from '../mock/mock-film';

const COUNT__FILM = 22;

export default class FilmModel {
  #films = Array.from({length: COUNT__FILM}, generateFilm);

  get films() {
    return this.#films;
  }
}
