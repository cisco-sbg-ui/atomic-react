import moment from "moment";

export const defaultDateFormat = "l LT";

export function formatDate(date, format = defaultDateFormat, forceUTC = false) {
  if (!date) {
    return null;
  }

  if (!date.format) {
    date = moment(date);
  }

  if (forceUTC) {
    date = date.utc();
  }

  if (format === "fromNow") {
    return date.fromNow();
  }

  return date.format(format);
}
