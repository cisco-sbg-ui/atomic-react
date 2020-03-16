import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AAlert.scss";
import {keyCodes} from "../../utils/helpers";
import AIcon from "../AIcon";

const AAlert = forwardRef(
  (
    {
      children,
      className: propsClassName,
      dismissable = true,
      level = "info",
      onClose,
      ...rest
    },
    ref
  ) => {
    const dismissableKeyDownHandler = e => {
      if (onClose && [keyCodes.enter, keyCodes.space].includes(e.keyCode)) {
        e.preventDefault();
        onClose(e);
      }
    };

    let className = `a-alert a-alert--state-`,
      icon = "";

    switch (level) {
      case "success":
        className += "success";
        icon = "good";
        break;
      case "warning":
        className += "warning";
        icon = "warning";
        break;
      case "danger":
        className += "danger";
        icon = "critical-stop";
        break;
      default:
        className += "information";
        icon = "information";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} role="alert" tabIndex={0} ref={ref} className={className}>
        <AIcon className="a-alert__icon" size="16">
          {icon}
        </AIcon>
        <div className="a-alert__message">{children}</div>
        {dismissable && (
          <AIcon
            className="a-alert__icon a-alert__icon--close"
            onClick={e => onClose && onClose(e)}
            onKeyDown={dismissableKeyDownHandler}
            size="16"
            tabIndex={0}>
            close
          </AIcon>
        )}
      </div>
    );
  }
);

AAlert.defaultProps = {
  dismissable: true,
  level: "info"
};

AAlert.propTypes = {
  /**
   * Toggles the close button.
   */
  dismissable: PropTypes.bool,
  /**
   * Specifies the display variant.
   */
  level: PropTypes.oneOf(["info", "success", "warning", "danger"]),
  /**
   * A callback for handling the close event.
   */
  onClose: PropTypes.func
};

export default AAlert;
