import { FilterType } from '../mock/consts.js';
import dayjs from 'dayjs';

const isEventInFuture = (eventDate) => !dayjs().isAfter(eventDate, 'D');
const isEventInPast = (eventDate) => dayjs().isAfter(eventDate, 'D');

export const filter = {
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventInFuture(event.dateFrom)),
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.PAST]: (events) => events.filter((event) => isEventInPast(event.dateTo))
};
