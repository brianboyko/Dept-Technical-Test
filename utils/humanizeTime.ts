import humanizeDuration from "humanize-duration";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";

export const humanizeTime = (time: Date): string => {
  return humanizeDuration(
    differenceInMilliseconds(new Date(), time)
  );
};

export default humanizeTime; 