import { useCallback, useState } from "react";

/**
 * Sequencing logic for setting an incoming date relative to an existing date range
 * Flow: first date -> second date -> first date -> second date -> (etc.)
 * @param {Array.<Date|null>} oldRange - Tuple with starting date and ending date
 * @param {Date} incomingDate - The next date to sequence
 * @returns tuple the newly set date range
 */
export const stepSequencer = (existingRange, nextDate) => {
  const [startingDate, endingDate] = existingRange;
  const isRangeEmpty = !startingDate && !endingDate;
  const shouldResetRange = startingDate && endingDate;

  return isRangeEmpty || shouldResetRange ?
    [nextDate, null] :
    [startingDate, nextDate];
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