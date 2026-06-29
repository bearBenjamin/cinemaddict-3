import { generateFilm } from '../mock/film';

const COUNT__FILM = 5;

export default class FilmModel {
  films = Array.from({length: COUNT__FILM}, generateFilm);

  getFilms() {
    return this.films;
  }
}
