import {generatePoint} from '../mock/point.js';
import {generateOfferGroups} from '../mock/offers.js';

const offersGroup = generateOfferGroups();
export default class PointsModel {
  #points = Array.from({length:10}, (_item, index) => generatePoint(index + 1));
  #offers = this.points.map((point) => offersGroup.find((offer) => offer.type === point.type.toLowerCase()));

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }
}

