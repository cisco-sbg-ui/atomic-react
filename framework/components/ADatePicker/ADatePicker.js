import PropTypes from "prop-types";
import React, {forwardRef, useState} from "react";

import AButton from "../AButton";
import AIcon from "../AIcon";
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

const ADatePicker = forwardRef(
  ({className: propsClassName, onChange, value = new Date(), ...rest}, ref) => {
    const [viewDate, setViewDate] = useState(value);
    let className = "a-date-picker";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let firstDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      viewDate.getDate() - viewDate.getDay()
    );
    while (
      firstDate.getFullYear() >= viewDate.getFullYear() &&
      firstDate.getMonth() >= viewDate.getMonth() &&
      firstDate.getDate() > 1
    ) {
      firstDate.setDate(firstDate.getDate() - 7);
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <div className="a-date-picker__header">
          <AButton
            tertiaryAlt
            icon
            className="a-date-picker__prev"
            onClick={() => {
              setViewDate(
                new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
              );
            }}>
            <AIcon size={13.6}>chevron-left</AIcon>
          </AButton>
          <AButton
            tertiaryAlt
            icon
            className="a-date-picker__next"
            onClick={() => {
              setViewDate(
                new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
              );
            }}>
            <AIcon size={13.6}>chevron-right</AIcon>
          </AButton>
          <div className="a-date-picker__title">
            <span className="a-date-picker__month">
              {fullMonthNames[viewDate.getMonth()]}
            </span>{" "}
            <span className="a-date-picker__year">
              {viewDate.getFullYear()}
            </span>
          </div>
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
              const sunday = new Date(+firstDate);
              sunday.setDate(sunday.getDate() + i * 7);
              return (
                <tr key={i}>
                  {[...Array(7)].map((y, j) => {
                    const thisDate = new Date(+sunday);
                    thisDate.setDate(thisDate.getDate() + j);
                    return (
                      <td
                        key={j}
                        className={`a-date-picker__day${
                          thisDate.getMonth() !== viewDate.getMonth()
                            ? " disabled"
                            : ""
                        }${
                          thisDate.getFullYear() === value.getFullYear() &&
                          thisDate.getMonth() === value.getMonth() &&
                          thisDate.getDate() === value.getDate()
                            ? " selected"
                            : ""
                        }`}>
                        {thisDate.getMonth() !== viewDate.getMonth() ? (
                          thisDate.getDate()
                        ) : (
                          <button
                            type="button"
                            className="a-date-picker__day__label"
                            onClick={() => {
                              onChange && onChange(thisDate);
                            }}>
                            {thisDate.getDate()}
                          </button>
                        )}
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

ADatePicker.propTypes = {
  /**
   * Handles the `change` event for when a date is selected.
   */
  onChange: PropTypes.func,
  /**
   * Sets the date selected.
   */
  value: PropTypes.instanceOf(Date)
};

ADatePicker.displayName = "ADatePicker";

export default ADatePicker;
