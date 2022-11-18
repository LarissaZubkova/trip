import {getRandomInteger} from '../utils';

const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];
  const randomIndex = getRandomInteger(0, description.length - 1);

  return description[randomIndex];
};

const generateType = () => {
  const type = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

  const randomIndex = getRandomInteger(0, type.length - 1);

  return type[randomIndex];
};

const generateName = () => {
  const cities = ['Naha', 'Osaka', 'Nara', 'Kioto', 'Tokio'];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateDestination = () => ({
  description: Array.from({length:3}, generateDescription),
  name: generateName(),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger()}`,
      description: generateDescription(),
    }
  ]
});

// const generateOffers = () => ({
//   id: 1,
//   title: 'Upgrade to a business class',
//   price: 120
// });

export const generatePoint = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination(),
  id: '0',
  isFavorite: false,
  offers: 1, //$Array<Offer.id>$,
  type: generateType(),
});

window.console.log(generatePoint());
