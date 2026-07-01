import { filter } from '../utils/utils-filter.js';

function generateFilter(films) {
  return Object.entries(filter).map(
    ([filterName, filterFilms]) => ({
      name: filterName,
      count: filterFilms(films),
    }),
  );
}

export { generateFilter };
