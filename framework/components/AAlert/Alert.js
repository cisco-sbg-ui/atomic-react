import React, {forwardRef} from "react";
import {Tippy} from "@cisco-ats/components";
import {formatDate} from "./utils/dates";

export default forwardRef(
  (
    {
      type = "alert",
      id,
      level = "info",
      message,
      timestamp,
      timestampFromNow,
      disabled,
      close = false,
      onClose,
      children,
      className,
      style,
      containerMargin = true
    },
    ref
  ) => {
    let alertClassName = `${type} ${type}--state-`,
      closeClass = "alert__icon icon-close",
      icon,
      containerStyle;

    if (containerMargin) {
      containerStyle = {margin: "25px"};
    }

    switch (level) {
      case "info":
        alertClassName += "information";
        icon = "information";
        break;
      case "success":
        alertClassName += "success";
        icon = "good";
        break;
      case "warning":
        alertClassName += "warning";
        icon = "warning";
        break;
      case "danger":
        alertClassName += "danger";
        icon = "critical-stop";
        break;
    }

    if (className) {
      alertClassName += ` ${className}`;
    }

    const iconClass = `${type}__icon icon-${icon}`;

    if (disabled) {
      closeClass += " disabled";
    }

    let timestampString;
    if (timestamp && timestampFromNow) {
      timestampString = formatDate(timestamp, "fromNow");
    } else {
      timestampString = formatDate(timestamp);
    }

    return (
      <div ref={ref} style={containerStyle}>
        <div id={id} className={alertClassName} style={style}>
          <div className={iconClass} />
          <div className={`${type}__message`}>{message || children}</div>
          {timestampString && (
            <div className={`${type}__timestamp`}>{timestampString}</div>
          )}
          {(close || onClose) && (
            <Tippy
              content="Clear notification"
              arrow
              duration={200}
              delay={500}>
              <a
                className={closeClass}
                onClick={() => {
                  if (disabled) {
                    return;
                  }

                  if (onClose) {
                    onClose();
                  }
                }}
              />
            </Tippy>
          )}
        </div>
      </div>
    );
  }
);
