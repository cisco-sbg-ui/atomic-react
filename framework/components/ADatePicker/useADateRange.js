import { useCallback, useState } from "react";
import { sortDates } from "./helpers";

/**
 * Sequencing logic for setting an incoming date relative to an existing date range.
 * It has no opinion on if the second selection must be larger than the first selection.
 * 
 * Flow: first date selection -> second date selection -> first date selection -> second date selection -> (etc.)
 * @param {Array.<Date|null>} oldRange - Tuple with starting date and ending date
 * @param {Date} incomingDate - The next date to sequence
 * @returns tuple the newly set date range
 */
export const stepSequencer = (existingRange, nextDate) => {
  const [rangeStartDate, rangeEndDate] = existingRange;
  const isRangeEmpty = !rangeStartDate && !rangeEndDate;
  const shouldResetRange = rangeStartDate && rangeEndDate;

  return isRangeEmpty || shouldResetRange ?
    [nextDate, null] :
    sortDates([rangeStartDate, nextDate]);
};

/**
 * Hook for storing date range state. Currently uses a step sequence, but has
 * room for flexibility in the future.
 */
const useADateRange = (initialRange = [null, null]) => {
  const [range, setRange] = useState(initialRange);

  const onChange = useCallback((incomingDate) => {
    setRange(oldRange => stepSequencer(oldRange, incomingDate));
  }, [setRange]);

  return {
    value: range,
    onChange,
  };
};

export default useADateRange;