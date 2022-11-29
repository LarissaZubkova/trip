import AbstractView from '../framework/view/abstract-view.js';

const createListEmptyView = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class ListEmptysView extends AbstractView {
  get template() {
    return createListEmptyView();
  }
}
