import PropTypes from "prop-types";
import React from "react";

//import "./ADivider.scss";

const Divider = ({className: propsClassName, light, lighter, style}) => {
  let className = "divider";

  if (lighter) {
    className += " divider--color-ligher"; // this typo is in the atomic source CSS.
  } else if (light) {
    className += " divider--color-light";
  }

  if (propsClassName) {
    className += ` ${propsClassName}`;
  }

  return <div className={className} style={style} />;
};

Divider.propTypes = {
  light: PropTypes.bool,
  lighter: PropTypes.bool
};

export default Divider;
