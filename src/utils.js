import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeTaskDueDate = (dateFrom) => dayjs(dateFrom).format('MMM YY');

const humanizeTaskDueTime = (date) => dayjs(date).format('hh:mm');

export {getRandomInteger, humanizeTaskDueDate, humanizeTaskDueTime};
