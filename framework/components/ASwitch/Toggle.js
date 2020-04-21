import React, {forwardRef} from "react";
import PropTypes from "prop-types";

const Toggle = forwardRef(
  (
    {id, disabled, on, label, labelOn = "On", labelOff = "Off", onChange},
    ref
  ) => {
    let displayLabel = label;
    if (!label) {
      displayLabel = on ? labelOn : labelOff;
    }

    return (
      <label ref={ref} id={id} className="switch">
        <input
          id={`${id}-checkbox`}
          className="switch__input"
          type="checkbox"
          checked={on}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="switch__box" />
        <span className="switch__label">{displayLabel}</span>
      </label>
    );
  }
);

Toggle.propTypes = {
  id: PropTypes.string,
  on: PropTypes.bool,
  disabled: PropTypes.bool,
  labelOn: PropTypes.string,
  labelOff: PropTypes.string,
  onChange: PropTypes.func
};

Toggle.displayName = "Toggle";

export default Toggle;
