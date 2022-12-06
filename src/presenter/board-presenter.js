import {render, replace} from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import NewPointView from '../view/new-point-view.js';
import TripItemView from '../view/trip-item-view.js';
import ListEmptysView from '../view/list-empty-view.js';
export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;
  #listComponent = new TripListView();
  #listPoints = [];
  #listOffers = [];

  constructor(listContainer, pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listOffers = [...this.#pointsModel.offers];

    this.#renderList();
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

  #renderPoint = (point, offers) => {
    const pointComponent = new TripItemView(point, offers);
    const newPointComponent = new NewPointView(point, offers);

    const replacePointToForm = () => {
      replace(newPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, newPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    newPointComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render (pointComponent, this.#listComponent.element);
  };
}
