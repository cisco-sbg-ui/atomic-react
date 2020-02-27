import PropTypes from "prop-types";
import React, {forwardRef} from "react";

const Panel = forwardRef(
  ({children, className: propsClassName, type, ...rest}, ref) => {
    let className = "panel";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    if (type === "grey") {
      className += " panel--color-gray";
    } else if (type === "white") {
      className += " panel--color-white";
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

Panel.propTypes = {
  type: PropTypes.oneOf(["default", "grey", "white"])
};

export default Panel;
