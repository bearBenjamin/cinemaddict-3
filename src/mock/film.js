import { getRandomArrayElement } from '../utils';
import { moviesData } from '../const';

const generateFilm = () => {
  const randomFilm = getRandomArrayElement(moviesData);
  return randomFilm;
};

export { generateFilm };
