import React, {forwardRef} from "react";

export default forwardRef(
  (
    {
      id,
      label,
      children,
      primary,
      secondary,
      tertiary,
      danger,
      priority = "primary",
      disabled,
      selected,
      to,
      target,
      onClick,
      linkClass
    },
    ref
  ) => {
    let className = "btn btn--";

    if (primary) {
      className += "primary";
    } else if (secondary) {
      className += "secondary";
    } else if (tertiary) {
      className += "tertiary";
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

    let content;

    if (linkClass) {
      const LinkClass = linkClass;
      content = (
        <LinkClass id={id} className={className} to={to}>
          {label || children}
        </LinkClass>
      );
    } else {
      content = (
        <a
          id={id}
          className={className}
          href={to}
          target={target}
          onClick={onClick}>
          {label || children}
        </a>
      );
    }

    return <span ref={ref}>{content}</span>;
  }
);
