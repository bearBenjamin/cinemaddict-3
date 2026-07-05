import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const truncateDescription = (text, maxLength = 139) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};

const humanizeReleaseYear = (date) => date ? dayjs(date).format('YYYY') : '';

const humanizeReleaseDate = (date) => date ? dayjs(date).format('D MMMM YYYY') : '';

const getRunTimeFilm = (runTime) => {
  if (!runTime || runTime <= 0) {
    return '';
  }

  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60;

  const hoursStr = hours > 0 ? `${hours}h` : '';
  const minutesStr = minutes > 0 ? `${minutes}min` : '';

  return [hoursStr, minutesStr].filter(Boolean).join(' ');
};

const getCurrentComments = (allComments, filmCommentIds) =>
  filmCommentIds
    .map((id) => allComments.find((comment) => comment.id === id))
    .filter(Boolean); // Удалит undefined, если комментарий не найден

const humanizeCommentDate = (date) => {
  if (!date) {
    return '';
  }

  const commentDate = dayjs(date);
  const now = dayjs();

  if (commentDate.isSame(now, 'day')) {
    return 'Today';
  }

  const diffInDays = now.diff(commentDate, 'day');

  if (diffInDays < 7) {
    return commentDate.fromNow();
  }

  return commentDate.format('YYYY/MM/DD HH:mm');
};

const getWatchedCount = (films) => films.filter((film) => film.filmInfo.userDetails.alreadyWatched).length;

const getUserStatus = (statusesConfigs, watchedCount) => {
  const currentConfig = statusesConfigs.find((item) => watchedCount >= item.min && watchedCount <= item.max);
  return currentConfig ? currentConfig.status : '';
};

const sortFilmsByDate = (films) => [...films].sort((filmA, filmB) => {
  const dateA = dayjs(filmA.filmInfo.release.date);
  const dateB = dayjs(filmB.filmInfo.release.date);

  return dateB.diff(dateA);
});

const sortFilmsByRating = (films) => [...films].sort((filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);

export { truncateDescription, humanizeReleaseYear, humanizeReleaseDate, getRunTimeFilm, getCurrentComments, humanizeCommentDate, getWatchedCount, getUserStatus, sortFilmsByDate, sortFilmsByRating  };
