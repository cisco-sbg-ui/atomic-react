import React, {forwardRef} from "react";

export default forwardRef(
  (
    {label, children, name, value, checked = false, disabled = false, onClick},
    ref
  ) => {
    return (
      <label ref={ref} className="radio">
        <input
          type="radio"
          name={name}
          className="radio__input"
          value={value}
          checked={checked}
          onChange={() => {}}
          disabled={disabled}
          onClick={onClick}
        />
        <span className="radio__box" />
        <span className="radio__label">{label || children}</span>
      </label>
    );
  }
);
