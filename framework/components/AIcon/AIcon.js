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
  ({children, className: propsClassName, label, size, ...rest}, ref) => {
    let className = `a-icon`;

    if (size && isNaN(size)) {
      className += ` a-icon--size-${size}`;
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const ariaLabel = label || `${children} icon`;

    return (
      <svg
        {...rest}
        ref={ref}
        {...(size && !isNaN(size) && {style: {width: size}})}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        aria-label={ariaLabel}>
        <path d={Icons[children]} />
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
   * Overrides the default `aria-label`, "[icon_name] icon".
   */
  label: PropTypes.string,
  /**
   * Size, if provided, is either a number or one of `["small", "medium", "large"]`
   */
  size: isSize
};

export default AIcon;
