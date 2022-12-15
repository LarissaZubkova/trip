import {render} from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import ListEmptysView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import ListSortView from '../view/list-sort-view.js';
import {SortTipe} from '../utils/utils.js';
import {sortPointDay} from '../mock/point.js';
export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;
  #listComponent = new TripListView();
  #sortComponent = new ListSortView();
  #listPoints = [];
  #listOffers = [];
  #pointPresenter = new Map();
  #currentSortType = SortTipe.DAY;
  #sourcedBoardPoints = [];

  constructor(listContainer, pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listOffers = [...this.#pointsModel.offers];

    this.#renderSort();
    this.#renderList();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortTipe.DAY:
        this.#listPoints.sort(sortPointDay);
        breack;
        default:
          this.#listPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handlerSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
    return;
   }

    this.#sortPoints(sortType);
  };

  #renderList = () => {
    render (this.#listComponent, this.#listContainer);
    if (this.#listPoints.length === 0) {
      this.#listContainer.querySelector('form').remove();
      return render(new ListEmptysView, this.#listContainer);
    }
    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i], this.#listOffers[i]);
    }
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#listContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortChange);
  };

  #renderPoint = (point, offers) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handleModeChange);
    pointPresenter.init(point, offers);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
