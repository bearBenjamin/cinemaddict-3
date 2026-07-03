// import FilmsPresenter from './presenter/films-presenter';
import FilmModel from './model/films-model';
import CommentsModel from './model/commetns-model';
import HederPresenter from './presenter/header-presenter';
import { getWatchedCount, getUserStatus } from './utils/utils-film-card';
import { comments, USER_STATUS_CONFIGS } from './const';
import MainPresenter from './presenter/main-presenter';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');

const filmsModel = new FilmModel();
const commentsModel = new CommentsModel({ comments: comments });

const watchedCount = getWatchedCount(filmsModel.films);
const currentStatus = getUserStatus(USER_STATUS_CONFIGS, watchedCount);

const headerPresenter = new HederPresenter({ header, currentStatus });
const mainPresenter = new MainPresenter({
  mainContainer: main,
  filmsModel,
  commentsModel,
});

footerStatistic.textContent = `${watchedCount} movies inside`;

headerPresenter.init();
mainPresenter.init();
