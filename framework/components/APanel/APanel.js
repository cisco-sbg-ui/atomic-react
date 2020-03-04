import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./APanel.scss";

const APanel = forwardRef(
  ({children, className: propsClassName, type, ...rest}, ref) => {
    let className = "a-panel";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    if (type === "grey") {
      className += " a-panel--color-gray";
    } else if (type === "white") {
      className += " a-panel--color-white";
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

APanel.propTypes = {
  /**
   * Display a style variant.
   */
  type: PropTypes.oneOf(["default", "grey", "white"])
};

export default APanel;
