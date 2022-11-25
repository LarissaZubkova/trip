import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
};

const humanizeDueDate = (dateFrom) => dayjs(dateFrom).format('MMM DD');

const humanizeFormDueDate = (date) => dayjs(date).format('YY/MM/DD hh:mm');

const humanizeDueTime = (date) => dayjs(date).format('hh:mm');

export {getRandomInteger, getRandomElement, humanizeDueDate, humanizeDueTime, humanizeFormDueDate};
