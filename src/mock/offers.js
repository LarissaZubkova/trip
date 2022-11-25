import {getRandomInteger, getRandomElement} from '../utils.js';
import {POINT_TYPES} from './consts.js';

const OFFER_TITLES = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast'
];

const OfferPrise = {
  MIN: 10,
  MAX: 50
};

const OfferQuantity = {
  MIN: 1,
  MAX: 5
};

const generateTitle = () => getRandomElement(OFFER_TITLES);
const generatePrice = () => getRandomInteger(OfferPrise.MIN, OfferPrise.MAX);

const generateOffer = (id) => ({
  id,
  title: generateTitle(),
  price: generatePrice()
});

const generateOffers = () => {
  const offerQuantity = getRandomInteger(OfferQuantity.MIN, OfferQuantity.MAX);

  return Array.from({length: offerQuantity}, (_item, index) => generateOffer(index + 1));

};

const generateOfferGroups = () =>
  POINT_TYPES.map((type) => ({
    type,
    offers: generateOffers()
  }));

export {generateOfferGroups};
