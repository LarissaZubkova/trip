import {createElement} from '../render.js';

const createListEmptyView = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class ListEmptysView {
  #element = null;

  get template() {
    return createListEmptyView();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
