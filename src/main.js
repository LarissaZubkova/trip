import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter();

console.log(pointsModel);

render(new ListFilterView(), tripFiltersElement);
render(new ListSortView(), tripEventsElement);

boardPresenter.init(tripEventsElement, pointsModel);
