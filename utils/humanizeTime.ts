import humanizeDuration from 'humanize-duration';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

export const humanizeTime = (time: Date, nowTime = new Date()): string => {
  return humanizeDuration(differenceInMilliseconds(nowTime, time));
};

export default humanizeTime;
