import ProfileView from './view/profile-view';
import FilmsPresenter from './presenter/films-presenter';
import { render } from './render';
import PopupView from './view/popup-view';

const header = document.querySelector('.header');
const main = document.querySelector('.main');

const profileComponent = new ProfileView();

const filmsPresenter = new FilmsPresenter({ mainContainer: main });

render(profileComponent, header);
render(new PopupView, main.parentElement);

filmsPresenter.init();
