import React, {forwardRef} from "react";
import PropTypes from "prop-types";

import AIcon from "../AIcon";
import "./AContextualNotification.scss";

const baseClass = "a-context";

const AContextualNotification = forwardRef(
  ({children, className: propsClassName, arrow, variant, ...rest}, ref) => {
    let className = baseClass,
      arrowClass = `${baseClass}__arrow`,
      iconClass = `${baseClass}__icon`,
      messageClass = `${baseClass}__message`,
      icon;

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    if (variant) {
      className += ` ${baseClass}--state-${variant}`;

      if (variant === "success") {
        icon = "good";
      } else if (variant === "info") {
        icon = "information";
      } else if (variant === "danger") {
        icon = "critical-stop";
      } else {
        icon = variant;
      }
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <AIcon className={iconClass}>{icon}</AIcon>
        {arrow && <div className={arrowClass} />}
        <div className={messageClass}>{children}</div>
      </div>
    );
  }
);

AContextualNotification.propTypes = {
  /**
   * Render an arrow on the border of the component
   */
  arrow: PropTypes.bool,
  /**
   * Variant of the contextual notification
   */
  variant: PropTypes.oneOf(["success", "info", "warning", "danger"])
};

AContextualNotification.defaultProps = {
  variant: "info"
};

AContextualNotification.displayName = "AContextualNotification";

export default AContextualNotification;
