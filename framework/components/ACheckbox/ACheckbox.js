import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ACheckbox.scss";

const ACheckbox = forwardRef(
  (
    {
      name,
      value,
      checked,
      disabled,
      indeterminate,
      onClick,
      label,
      children,
      tooltip,
      checkboxClassName,
      className,
      id,
      wrap
    },
    ref
  ) => {
    return (
      <label ref={ref} className={`a-checkbox ${className}`} id={id}>
        <input
          type="checkbox"
          className="a-checkbox__input"
          name={name}
          value={value || checked}
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          onChange={() => {}}
          onClick={onClick}
          role="checkbox"
          ref={el => el && (el.indeterminate = indeterminate)}
        />
        <span
          aria-hidden="true"
          className={`a-checkbox__box ${checkboxClassName}`}
        />
        <span
          className={`a-checkbox__label ${wrap && "a-checkbox__label--wrap"}`}
          title={tooltip}>
          {label || children}
        </span>
      </label>
    );
  }
);

ACheckbox.defaultProps = {
  checked: false,
  disabled: false,
  indeterminate: false,
  checkboxClassName: "",
  className: "",
  id: ""
};

ACheckbox.propTypes = {
  /**
   * A class name to append to the input.
   */
  checkboxClassName: PropTypes.string,
  /**
   * Toggles the `checked` state.
   */
  checked: PropTypes.bool,
  /**
   * A class name to append to the label.
   */
  className: PropTypes.string,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
  /**
   * A unique identifier for the label.
   */
  id: PropTypes.string,
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
   * The checkbox label.
   */
  label: PropTypes.string,
  /**
   * The label's title.
   */
  tooltip: PropTypes.string,
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
