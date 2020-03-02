import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AIcon.scss";
import Icons from "./icons.json";

const isSize = function(props, propName, componentName) {
  if (
    props[propName] &&
    isNaN(props[propName]) &&
    !["small", "medium", "large"].includes(props[propName])
  ) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName}. Expected a number or one of [ "small", "medium", "large" ].`
    );
  }
};

const AIcon = forwardRef(
  ({children, className: propsClassName, size, color, ...rest}, ref) => {
    let className = `a-icon`;

    if (size && isNaN(size)) {
      className += ` a-icon--size-${size}`;
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <svg
        {...rest}
        ref={ref}
        {...(size && !isNaN(size) && {style: {width: size}})}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        aria-labelledby="title">
        <title id="title">{children} icon</title>
        <path d={Icons[children]} {...(color && {fill: color})} />
      </svg>
    );
  }
);

AIcon.propTypes = {
  /**
   * The `AIcon` component requires the icon name as the only child element.
   */
  children: PropTypes.string.isRequired,
  /**
   *  Accepts any CSS color value (ex: `#fff`, `rgba(255, 255, 255, 0.5)`, `var(--var-color)`)
   */
  color: PropTypes.string,
  /**
   * Size, if provided, is either a number or one of `["small", "medium", "large"]`
   */
  size: isSize
};

export default AIcon;
