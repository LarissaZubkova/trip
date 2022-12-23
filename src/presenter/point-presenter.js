import {render, replace, remove} from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';
import TripItemView from '../view/trip-item-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {
  #pointListContainer = null;
  #changeMode = null;

  #pointComponent = null;
  #newPointComponent = null;

  #point = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeMode = changeMode;
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
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#newPointComponent, prevNewPointComponent);
    }

    remove(prevPointComponent);
    remove(prevNewPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#newPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#newPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#newPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

