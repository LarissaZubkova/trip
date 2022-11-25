import {createElement} from '../render.js';
import {humanizeDueDate, humanizeDueTime} from '../utils.js';

const createTripItemView = (point, offersModel) => {
  const {destination, basePrice, offers, dateFrom, dateTo, type} = point;
  const date = dateFrom !== null
    ? humanizeDueDate(dateFrom)
    : '';

  const timeFrom = dateFrom !== null
    ? humanizeDueTime(dateFrom)
    : '';

  const timeTo = dateFrom !== null
    ? humanizeDueTime(dateTo)
    : '';

  const cteateOffers = () => {
    const carrentOffers = offers.map((id) => offersModel.offers.find((offer) => id === offer.id));
    return carrentOffers.map((offer) => offer !== undefined ?
      `<li class="event__offer">
       <span class="event__offer-title">${offer.title}</span>
       &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </li>` : '').join('');

  };

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${destination.pictures[0].src}" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
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
      <ul class="event__selected-offers">${cteateOffers()}</ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`);
};
export default class TripItemView {
  #element = null;
  #point = null;
  #offers = null;

  constructor(point, offers) {
    this.#point = point;
    this.#offers = offers;
  }

  get template() {
    return createTripItemView(this.#point, this.#offers);
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
