import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ADivider.scss";

const ADivider = forwardRef(
  ({className: propsClassName, light, lighter, ...rest}, ref) => {
    let className = "a-divider";

    if (lighter) {
      className += " a-divider--color-lighter";
    } else if (light) {
      className += " a-divider--color-light";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return <div {...rest} ref={ref} className={className} />;
  }
);

ADivider.propTypes = {
  /**
   * Toggles the light variant.
   */
  light: PropTypes.bool,
  /**
   * Toggles the lighter variant.
   */
  lighter: PropTypes.bool
};

export default ADivider;
