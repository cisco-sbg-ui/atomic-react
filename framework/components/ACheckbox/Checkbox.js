import React, {forwardRef} from "react";

export default forwardRef(
  (
    {
      name,
      value,
      checked = false,
      disabled = false,
      onClick,
      label,
      children,
      tooltip,
      checkboxClassName = "",
      className = "",
      id = ""
    },
    ref
  ) => {
    return (
      <span ref={ref} className={className}>
        <label className="checkbox" id={id}>
          <input
            type="checkbox"
            className="checkbox__input"
            name={name}
            value={value || checked}
            checked={checked}
            disabled={disabled}
            onChange={() => {}}
            onClick={onClick}
          />
          <div className={`checkbox__box ${checkboxClassName}`} />
          <div className="checkbox__label" title={tooltip}>
            {label || children}
          </div>
        </label>
      </span>
    );
  }
);
