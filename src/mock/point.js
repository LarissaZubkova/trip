import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/utils';

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

const generateFromToDates = () => {
  const maxGap = 14;
  const fromDate = dayjs()
    .add(getRandomInteger(-maxGap, maxGap), 'day')
    .add(getRandomInteger(-maxGap, maxGap), 'hour')
    .add(getRandomInteger(-maxGap, maxGap), 'minute');
  const toDate = fromDate
    .clone()
    .add(getRandomInteger(0, 14), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');
  return {
    from: fromDate.toISOString(),
    to: toDate.toISOString()
  };
};

const generatePrice = () => getRandomInteger(1, 100) * 10;

export const generatePoint = (id) => {
  const dates = generateFromToDates();
  const basePrice = generatePrice();
  const offersGroup = Array.from({length:getRandomInteger(1, 4)}, (i, j) => getRandomInteger(j + 1));
  const offers = new Set(offersGroup);

  return {
    basePrice,
    dateFrom: dates.from,
    dateTo: dates.to,
    destination: generateDestination(),
    id,
    isFavorite: Boolean(getRandomInteger(0,1)),
    offers: [...offers],
    type: generateType(),
  };
};

window.console.log(generatePoint());
