import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ADropdown.scss";

const ADropdown = forwardRef(
  ({active, children, className: propsClassName, ...rest}, ref) => {
    let className = "a-dropdown";

    if (active) {
      className += " a-dropdown--state-active";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

ADropdown.propTypes = {
  /**
   * Toggles the active state.
   */
  active: PropTypes.bool
};

export default ADropdown;
