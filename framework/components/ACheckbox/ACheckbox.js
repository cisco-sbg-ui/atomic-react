import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ACheckbox.scss";

const ACheckbox = forwardRef(
  (
    {
      checked = false,
      children,
      className: propsClassName,
      disabled = false,
      indeterminate = false,
      name,
      onClick,
      value,
      wrap,
      ...rest
    },
    ref
  ) => {
    const className = "a-checkbox";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <label {...rest} ref={ref} className={className}>
        <input
          type="checkbox"
          className="a-checkbox__input"
          name={name}
          value={value}
          aria-checked={indeterminate ? "mixed" : checked}
          disabled={disabled}
          onChange={() => {}}
          onClick={onClick}
          role="checkbox"
          ref={el =>
            el && ((el.indeterminate = indeterminate) || (el.checked = checked))
          }
        />
        <span aria-hidden="true" className="a-checkbox__box" />
        <span
          className={`a-checkbox__label ${wrap && "a-checkbox__label--wrap"}`}>
          {children}
        </span>
      </label>
    );
  }
);

ACheckbox.defaultProps = {
  checked: false,
  disabled: false,
  indeterminate: false
};

ACheckbox.propTypes = {
  /**
   * Toggles the `checked` state.
   */
  checked: PropTypes.bool,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
  /**
   * Toggles the `indeterminate` state.
   */
  indeterminate: PropTypes.bool,
  /**
   * The input's name.
   */
  name: PropTypes.string,
  /**
   * A callback for handling the click event.
   */
  onClick: PropTypes.func,
  /**
   * The input's value.
   */
  value: PropTypes.string,
  /**
   * Toggles wrapping of long text in the label.
   */
  wrap: PropTypes.bool
};

export default ACheckbox;
