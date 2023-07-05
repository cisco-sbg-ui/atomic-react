import PropTypes from "prop-types";
import React, {forwardRef, useMemo, useState} from "react";

import AButton from "../AButton";
import AIcon from "../AIcon";
import {
  isDateBetweenRange,
  isDateTipOfRange,
  isSameDate,
  sortDates } from "./helpers";
import "./ADatePicker.scss";

const fullMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const ICON_SIZE = 10;

const ADatePicker = forwardRef(
  ({
    className: propsClassName,
    onChange,
    // In the case of a date range, it is assumed
    // the passed value is represented as [startDate, endDate]
    value = new Date(),
    minDate,
    maxDate,
    ...rest
  }, ref) => {
    const hasMinDate = minDate instanceof Date;
    const hasMaxDate = maxDate instanceof Date;
    const [hoveredDate, setHoveredDate] = useState(null);
    // Because date comparisons in this widget are
    // only concerned with the day, reset the
    // time to midnight for equal comparisons
    if (hasMinDate) {
      minDate.setHours(0, 0, 0, 0);
    }
    if (hasMaxDate) {
      maxDate.setHours(0, 0, 0, 0);
    }
    const isRange = Array.isArray(value);
    const startDate = isRange && value[0];
    const endDate = isRange && value[1];
    // Picker date refers to the month/year combo
    // that is shown in the UI
    const [pickerDate, setPickerDate] = useState(() => {
      if (!isRange) {
        return value;
      }
    
      // If the supplied range is empty, i.e., [null, null] default
      // picker to current date
      const dates = value.filter(d => d instanceof Date);
      if (!dates.length) {
        return new Date();
      }
      // Use the ending date to determine which month to
      // display in the calendar
      return sortDates(dates)[dates.length - 1];
    });
    const firstPickerDate = useMemo(() => {
      let currDate = new Date(
        pickerDate.getFullYear(),
        pickerDate.getMonth(),
        pickerDate.getDate() - pickerDate.getDay()
      );

      while (
        currDate.getFullYear() >= pickerDate.getFullYear() &&
        currDate.getMonth() >= pickerDate.getMonth() &&
        currDate.getDate() > 1
      ) {
        currDate.setDate(currDate.getDate() - 7);
      }

      return currDate;
    }, [pickerDate]);
    let className = "a-date-picker";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <div className="a-date-picker__header">
          <AButton
            tertiaryAlt
            icon
            className="a-date-picker__prev"
            onClick={() =>
              setPickerDate(
                new Date(pickerDate.getFullYear(), pickerDate.getMonth() - 1, 1)
              )
            }>
            <AIcon size={ICON_SIZE}>chevron-left</AIcon>
          </AButton>
          <div className="a-date-picker__title">
            <span className="a-date-picker__month">
              {fullMonthNames[pickerDate.getMonth()]}
            </span>{" "}
            <span className="a-date-picker__year">
              {pickerDate.getFullYear()}
            </span>
          </div>
          <AButton
            tertiaryAlt
            icon
            className="a-date-picker__next"
            onClick={() =>
              setPickerDate(
                new Date(pickerDate.getFullYear(), pickerDate.getMonth() + 1, 1)
              )
            }>
            <AIcon size={ICON_SIZE}>chevron-right</AIcon>
          </AButton>
        </div>
        <table className="a-date-picker__calendar">
          <thead>
            <tr>
              <th className="a-date-picker__week" scope="col">
                <span aria-label="Sunday">Su</span>
              </th>
              <th className="a-date-picker__week" scope="col">
                <span aria-label="Monday">Mo</span>
              </th>
              <th className="a-date-picker__week" scope="col">
                <span aria-label="Tuesday">Tu</span>
              </th>
              <th className="a-date-picker__week" scope="col">
                <span aria-label="Wednesday">We</span>
              </th>
              <th className="a-date-picker__week" scope="col">
                <span aria-label="Thursday">Th</span>
              </th>
              <th className="a-date-picker__week" scope="col">
                <span aria-label="Friday">Fr</span>
              </th>
              <th className="a-date-picker__week" scope="col">
                <span aria-label="Saturday">Sa</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((x, i) => {
              const sunday = new Date(+firstPickerDate);
              sunday.setDate(sunday.getDate() + i * 7);
              return (
                <tr key={i}>
                  {[...Array(7)].map((y, j) => {
                    const currWeekDay = new Date(+sunday);
                    currWeekDay.setDate(currWeekDay.getDate() + j);

                    // Helpers for determining style classes
                    const isDayOutsideMonth =
                      currWeekDay.getMonth() !== pickerDate.getMonth();
                    const isDayBeforeMinDate =
                      hasMinDate &&
                      Date.parse(currWeekDay) < Date.parse(minDate);
                    const isDayPastMaxDate =
                      hasMaxDate &&
                      Date.parse(currWeekDay) > Date.parse(maxDate);
                    const isDayWithinRange =
                      isRange && isDateBetweenRange(currWeekDay, value);
                    const canDayBecomeEndDate =
                      !endDate &&
                      hoveredDate &&
                      !isDayOutsideMonth &&
                      ((Date.parse(currWeekDay) < Date.parse(startDate) &&
                        Date.parse(currWeekDay) > Date.parse(hoveredDate)) ||
                        (Date.parse(currWeekDay) > Date.parse(startDate) &&
                          Date.parse(currWeekDay) < Date.parse(hoveredDate)));

                    // Stylistic states the calendar day can be in
                    const isSelected = isRange
                      ? isDateTipOfRange(currWeekDay, value)
                      : isSameDate(currWeekDay, value);
                    const isDaySelectedInAnotherMonth =
                      isRange &&
                      isDayOutsideMonth &&
                      (isDayWithinRange || isSelected);
                    const isHighlighted =
                      !isDayBeforeMinDate &&
                      !isDayPastMaxDate &&
                      (isDayWithinRange ||
                        canDayBecomeEndDate ||
                        isDaySelectedInAnotherMonth);
                    const isDisabled =
                      currWeekDay.getMonth() !== pickerDate.getMonth() ||
                      isDayBeforeMinDate ||
                      isDayPastMaxDate;

                    const baseBtnClassName = "a-date-picker__day__btn";
                    let btnClassName = baseBtnClassName;
                    if (isSelected) {
                      btnClassName += ` ${baseBtnClassName}--selected`;
                    }
                    if (isHighlighted) {
                      btnClassName += ` ${baseBtnClassName}--highlighted`;
                    }
                    if (isDisabled) {
                      btnClassName += ` ${baseBtnClassName}--disabled`;
                    }

                    return (
                      <td
                        onMouseEnter={() => setHoveredDate(currWeekDay)}
                        onMouseLeave={() => setHoveredDate(null)}
                        key={j}
                        className="a-date-picker__day">
                        <button
                          type="button"
                          disabled={isDisabled}
                          className={btnClassName}
                          onClick={() => {
                            onChange && onChange(currWeekDay);
                          }}>
                          {currWeekDay.getDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

const isValidDateTuple = (range) => {
  const isArray = Array.isArray(range);
  const isValidTypes = isArray && range.every(value => value instanceof Date || value === null);
  const isValidLength = isValidTypes && range.length <= 2;
  return isArray && isValidDateTuple && isValidLength;
};

function rangeTupleValidator(propValue, key, componentName) {
  if (!isValidDateTuple(propValue)) {
    throw new Error(
      "Invalid prop 'value' supplied to '" + componentName + "'. "
      + "When using a range, pass a tuple indicting a start and end "
      + "date, or 'null' if empty."   
    )
  }
  return null;
}

ADatePicker.propTypes = {
  /**
   * Handles the `change` event for when a date is selected.
   */
  onChange: PropTypes.func,
  /**
   * Sets the selected date(s). If selecting a single date, a JavaScript
   * `Date` object should be passed. If selecting a date range, however,
   * then a two-item array should be supplied representing the starting
   * date and ending date. If either the starting date or ending date is
   * not yet selected, you should pass in the date as `null`.
   * @example supplying the starting date with an unselected ending date
   * value={[new Date(2022, 2, 28), null]}
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(rangeTupleValidator)
  ]),
  /**
   * The minimum date allowed for selection
   */
  minDate: PropTypes.instanceOf(Date),
  /**
   * The maximum date allowed for selection
   */
  maxDate: PropTypes.instanceOf(Date)
};

ADatePicker.displayName = "ADatePicker";

export default ADatePicker;
