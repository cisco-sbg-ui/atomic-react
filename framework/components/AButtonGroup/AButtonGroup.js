import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import AButtonGroupContext from "./AButtonGroupContext";
import "./AButtonGroup.scss";

const AButtonGroup = forwardRef(
  (
    {
      children,
      className: propsClassName,
      selectedValues,
      multiple = false,
      onChange,
      ...rest
    },
    ref
  ) => {
    let className = "a-button-group";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const buttonGroupContext = {
      selectedValues,
      toggleValue: (toggledValue) => {
        let newSelectedValues = selectedValues.includes(toggledValue)
          ? selectedValues.filter((x) => x !== toggledValue)
          : multiple
          ? selectedValues.concat([toggledValue])
          : [toggledValue];
        onChange && onChange(toggledValue, newSelectedValues);
      }
    };

    return (
      <div {...rest} ref={ref} className={className}>
        <AButtonGroupContext.Provider value={buttonGroupContext}>
          {children}
        </AButtonGroupContext.Provider>
      </div>
    );
  }
);

AButtonGroup.propTypes = {
  /**
   * Toggles whether multiple buttons can be selected.
   */
  multiple: PropTypes.bool,
  /**
   * Handles the event when button selection has changed.
   * @param {String} targetValue The toggled button's value.
   * @param {Array} allSelectedValues An array of all selected button values.
   */
  onChange: PropTypes.func,
  /**
   * Sets an array of selected values.
   */
  selectedValues: PropTypes.arrayOf(PropTypes.string)
};

export default AButtonGroup;
