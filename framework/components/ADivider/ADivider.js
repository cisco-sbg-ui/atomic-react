import PropTypes from "prop-types";
import React from "react";

import "./ADivider.scss";

const ADivider = ({className: propsClassName, light, lighter, ...rest}) => {
  let className = "a-divider";

  if (lighter) {
    className += " a-divider--color-lighter";
  } else if (light) {
    className += " a-divider--color-light";
  }

  if (propsClassName) {
    className += ` ${propsClassName}`;
  }

  return <div {...rest} className={className} />;
};

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
