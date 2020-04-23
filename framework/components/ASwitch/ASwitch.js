import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ASwitch.scss";

const ASwitch = forwardRef(
  (
    {
      checked = false,
      children,
      className: propsClassName,
      disabled = false,
      onClick,
      value,
      wrap,
      ...rest
    },
    ref
  ) => {
    let className = "a-switch";

    if (disabled) {
      className += " a-switch--disabled";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const boxProps = {
      "aria-hidden": "true",
      className: "a-switch__box"
    };

    return (
      <label {...rest} ref={ref} className={className}>
        <input
          type="checkbox"
          className="a-switch__input"
          value={value}
          aria-checked={checked}
          checked={checked}
          aria-disabled={disabled}
          disabled={disabled}
          onChange={() => {}}
          onClick={onClick}
          role="switch"
          ref={(el) => el && (el.checked = checked)}
        />
        <span {...boxProps} />
        <span
          className={`a-switch__label${wrap ? " a-switch__label--wrap" : ""}`}>
          {children}
        </span>
      </label>
    );
  }
);

ASwitch.propTypes = {
  /**
   * Toggles the `checked` state.
   */
  checked: PropTypes.bool,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
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

ASwitch.displayName = "ASwitch";

export default ASwitch;
