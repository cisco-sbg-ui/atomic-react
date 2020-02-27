import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AIcon.scss";
import Icons from "./icons.json";

const AIcon = forwardRef(
  ({children, className: propsClassName, size, color, ...rest}, ref) => {
    let className = `a-icon`;

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <svg
        {...rest}
        ref={ref}
        className={className}
        width={size || 32}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        aria-labelledby="title"
        preserveAspectRatio="xMidYMid meet">
        <title id="title">{children} icon</title>
        <path d={Icons[children]} fill={color || "#58585B"} />
      </svg>
    );
  }
);

AIcon.propTypes = {
  children: PropTypes.string
};

export default AIcon;
