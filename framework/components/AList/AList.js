import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AList.scss";

const AList = forwardRef(
  ({children, className: propsClassName, hoverable = true, ...rest}, ref) => {
    let className = "a-list";

    if (hoverable) {
      className += " a-list--hoverable";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} className={className}>
        {children}
      </div>
    );
  }
);

AList.propTypes = {
  /**
   * Toggles the hover visualization on list items.
   */
  hoverable: PropTypes.bool
};

export default AList;
