import {render} from './framework/render.js';
import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter(tripEventsElement, pointsModel);

const filters = generateFilter(pointsModel.points);

render(new ListFilterView(filters), tripFiltersElement);
render(new ListSortView(), tripEventsElement);

boardPresenter.init();
