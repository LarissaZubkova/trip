import {render, replace, remove} from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';
import TripItemView from '../view/trip-item-view.js';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #newPointComponent = null;

  #point = null;
  #offers = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (point, offers) => {
    this.#point = point;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevNewPointComponent = this.#newPointComponent;

    this.#pointComponent = new TripItemView(point, offers);
    this.#newPointComponent = new NewPointView(point, offers);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);

    this.#newPointComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointComponent === null || prevNewPointComponent === null) {
      render (this.#pointComponent, this.#pointListContainer);
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevNewPointComponent.element)) {
      replace(this.#newPointComponent, prevNewPointComponent);
    }

    remove(prevPointComponent);
    remove(prevNewPointComponent);
  };

  desrtoy = () => {
    remove(this.#pointComponent);
    remove(this.#newPointComponent);
  };

  #replacePointToForm = () => {
    replace(this.#newPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#newPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}

