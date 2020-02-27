import React, {forwardRef} from "react";

export default forwardRef(
  (
    {
      children,
      className: propsClassName,
      label,
      primary,
      secondary,
      tertiary,
      tertiaryIcon,
      tertiaryIconOnly,
      danger,
      priority = "primary",
      onClick,
      id,
      disabled,
      selected,
      type = "button",
      style
    },
    ref
  ) => {
    /* eslint-disable react/button-has-type */

    let className = "btn btn--";

    if (primary) {
      className += "primary";
    } else if (secondary) {
      className += "secondary";
    } else if (tertiary) {
      className += "tertiary";
    } else if (tertiaryIcon) {
      className += "tertiary-icon";
    } else if (tertiaryIconOnly) {
      className += "tertiary-icon icon-only";
    } else if (danger) {
      className += "danger";
    } else {
      className += priority;
    }

    if (disabled) {
      className += " disabled";
    }

    if (selected) {
      className += " btn--state-selected";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <button
        ref={ref}
        key={id}
        className={className}
        onClick={onClick}
        id={id}
        disabled={disabled}
        type={type}
        style={style}>
        {label || children}
      </button>
    );
  }
);
