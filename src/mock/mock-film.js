import { getRandomArrayElement } from '../utils/common';
import { moviesData } from '../const';
import { nanoid } from 'nanoid';

const generateFilm = () => {
  const randomFilm = getRandomArrayElement(moviesData);
  return {
    ...randomFilm,
    id: nanoid()
  };
};

export { generateFilm };
