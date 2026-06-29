import ProfileView from './view/profile-view';
import FilmsPresenter from './presenter/films-presenter';
import { render } from './render';
import FilmModel from './model/films-model';
import { comments } from './const';
import CommentsModel from './model/commetns-model';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const filmsModel = new FilmModel();
const commentsModel = new CommentsModel({ comments: comments });

const profileComponent = new ProfileView();

const filmsPresenter = new FilmsPresenter({ mainContainer: main, filmsModel, commentsModel });

render(profileComponent, header);

filmsPresenter.init();
