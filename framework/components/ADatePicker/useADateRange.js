import { useCallback, useState } from "react";
import { sortDates } from "./helpers";

/**
 * Sequencing logic for adding a new date to a range of
 * dates.
 *
 * Flow: first date selection -> second date selection ->
 * first date selection -> second date selection -> (etc.)
 * @param {Array.<Date|null>} existingRange - Tuple with starting date and ending date
 * @param {Date} nextDate - The next date to sequence
 * @returns next range sequence
 */
export const getStackedRange = (existingRange, nextDate) => {
  const [startDate, endDate] = existingRange;
  const isEmpty = !startDate && !endDate;
  const isFull = startDate instanceof Date && endDate instanceof Date;

  return isEmpty || isFull ?
    [nextDate, null] :
    sortDates([startDate, nextDate]);
};


const useADateRange = (config = {}) => {
  // Support older version hook config
  let initialRange;
  let maxDays;
  const isUsingOldParams = Array.isArray(config);
  if (isUsingOldParams) {
    initialRange = config || [null, null];
  } else {
    initialRange = Array.isArray(config?.initialRange) ? config.initialRange : [null, null];
    maxDays = config?.maxDays || null;
  }
  const [range, setRange] = useState(initialRange);
  const [startDate, endDate] = range;
  let minDate, maxDate;
  if (maxDays && startDate && !endDate) {
    minDate = new Date(startDate);
    // Offset by 1 since one date is already selected
    minDate.setDate(startDate.getDate() - (parseInt(maxDays) - 1));

    maxDate = new Date(startDate);
    // Offset by 1 since one date is already selected
    maxDate.setDate(startDate.getDate() + (parseInt(maxDays) - 1));
  }
  if (maxDays && startDate && endDate) {
    minDate = null;
    maxDate = null;
  }

  const onChange = useCallback(date => {
    setRange(oldRange => getStackedRange(oldRange, date));
  }, [setRange]);

  return {
    value: range,
    setValue: setRange,
    onChange,
    minDate,
    maxDate
  };
};
export default useADateRange;
