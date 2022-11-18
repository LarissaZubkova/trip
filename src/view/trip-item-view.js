import {createElement} from '../render.js';
import {humanizeTaskDueDate, humanizeTaskDueTime} from '../utils.js';

const createTripItemView = (point) => {
  const {destination, basePrice, offers, dateFrom, dateTo} = point;

  const date = dateFrom !== null
    ? humanizeTaskDueDate(dateFrom)
    : '';

  const timeFrom = dateFrom !== null
    ? humanizeTaskDueTime(dateFrom)
    : '';

  const timeTo = dateFrom !== null
    ? humanizeTaskDueTime(dateTo)
    : '';


  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${destination.pictures[0].src}" alt="Event type icon">
      </div>
      <h3 class="event__title">Taxi Amsterdam</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">${offers.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers.price}</span>
        </li>
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`);
};
export default class TripItemView {
  constructor(point) {
    this.task = point;
  }

  getTemplate() {
    return createTripItemView(this.task);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
