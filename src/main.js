import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();

render(new ListFilterView(), tripFiltersElement);
render(new ListSortView(), tripEventsElement);

boardPresenter.init(tripEventsElement);
