import { FilterType } from '../const';
import { getWatchedCount } from './utils-film-card';

const filterAll = (films) => films;
const filterWatchlist = (films) =>
  films.filter((film) => film.filmInfo.userDetails.watchlist).length;
const filterFavorite = (films) =>
  films.filter((film) => film.filmInfo.userDetails.favorite).length;

const filter = {
  [FilterType.ALL]: (films) => filterAll(films),
  [FilterType.WATHLIST]: (films) => filterWatchlist(films),
  [FilterType.HISTORY]: (films) => getWatchedCount(films),
  [FilterType.FAVORITE]: (films) => filterFavorite(films),
};

export { filter };
