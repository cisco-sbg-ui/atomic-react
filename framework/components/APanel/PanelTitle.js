import PropTypes from "prop-types";
import React, {forwardRef} from "react";

const PanelTitle = forwardRef(
  ({children, className: propsClassName, id, small, style}, ref) => {
    let className = "panel__title";

    if (small) {
      className += " panel__title--size-small";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div ref={ref} key={id} className={className} id={id} style={style}>
        {children}
      </div>
    );
  }
);

PanelTitle.propTypes = {
  small: PropTypes.bool
};

export default PanelTitle;
