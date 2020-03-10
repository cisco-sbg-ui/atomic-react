import PropTypes from "prop-types";
import React from "react";

import "./ADropdown.scss";

const ADropdown = ({active, children, className: propsClassName, ...rest}) => {
  let className = "a-dropdown";

  if (active) {
    className += " a-dropdown--state-active";
  }

  if (propsClassName) {
    className += ` ${propsClassName}`;
  }

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
};

ADropdown.propTypes = {
  /**
   * Toggles the active state.
   */
  active: PropTypes.bool
};

export default ADropdown;
