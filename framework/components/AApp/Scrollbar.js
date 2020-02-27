import PropTypes from "prop-types";
import React, {forwardRef} from "react";

const Scrollbar = forwardRef(
  ({children, className: propsClassName, id, style, direction}, ref) => {
    let className = "scrollbar";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    if (direction === "horizontal") {
      className += " scrollbar--direction-horizontal";
    } else if (direction === "vertical") {
      className += " scrollbar--direction-vertical";
    }

    return (
      <div ref={ref} key={id} className={className} id={id} style={style}>
        {children}
      </div>
    );
  }
);

Scrollbar.propTypes = {
  type: PropTypes.oneOf(["horizontal", "vertical"])
};

export default Scrollbar;
