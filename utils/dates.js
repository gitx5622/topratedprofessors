 import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import localisedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(localisedFormat);

export function formatDeadline(date) {
  const formatedDate = dayjs(date);
  const timeNow = dayjs(new Date());
  const differenceInDays = formatedDate.diff(timeNow, 'day');
  if (differenceInDays === 0) return formatedDate.fromNow();
  if (differenceInDays < 0 ) return "Deadline passed";
  return formatedDate.calendar(null, {
    lastWeek: 'ddd [at] LT',
    sameElse: 'LT [on] ddd MMM DD YYYY',
  });
}

export function formatDate(date) {
  const formatedDate = dayjs(date);
  return formatedDate.calendar(null, {
    lastWeek: 'ddd [at] LT',
    sameElse: 'LT [on] ddd MMM DD YYYY',
  });
}
