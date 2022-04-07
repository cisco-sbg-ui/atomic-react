import { useCallback, useState } from "react";

/**
 * Sequencing logic for adding a new date to a range of
 * dates.
 * 
 * Flow: first date selection -> second date selection ->
 * first date selection -> second date selection -> (etc.)
 * @param {Array.<Date|null>} existingRange - Tuple with starting date and ending date
 * @param {Date} incomingDate - The next date to sequence
 * @returns next range sequence
 */
const rangeSequencer = (existingRange, incomingDate) => {
  const isFull = existingRange.length === 2;
  // If range is filled, reset with
  // a new start date
  return isFull ?
    [incomingDate] :
    existingRange.concat(incomingDate);
};

const useADateRange = (config) => {
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
  const [firstSelection, secondSelection] = range;
  let minDate, maxDate;
  if (maxDays && firstSelection && !secondSelection) {
    minDate = new Date(firstSelection);
    // Offset by 1 since one date is already selected
    minDate.setDate(firstSelection.getDate() - (parseInt(maxDays) - 1));

    maxDate = new Date(firstSelection);
    // Offset by 1 since one date is already selected
    maxDate.setDate(firstSelection.getDate() + (parseInt(maxDays) - 1));
  }
  if (maxDays && firstSelection && secondSelection) {
    minDate = null;
    maxDate = null;
  }

  const onChange = useCallback((incomingDate) => {
    setRange(oldRange => rangeSequencer(oldRange, incomingDate));
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
