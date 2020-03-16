import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AIcon.scss";
import Icons from "./icons.json";

let iconCounter = 0;

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
  ({children, className: propsClassName, size, title, ...rest}, ref) => {
    let className = `a-icon`;

    if (size && isNaN(size)) {
      className += ` a-icon--size-${size}`;
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    if (!title) {
      title = `${children} icon`;
    }

    const iconId = `a-icon_${iconCounter++}`;

    return (
      <svg
        {...rest}
        ref={ref}
        {...(size && !isNaN(size) && {style: {width: size}})}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        aria-labelledby={iconId}>
        <title id={iconId}>{title}</title>
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
   * Size, if provided, is either a number or one of `["small", "medium", "large"]`
   */
  size: isSize,
  /**
   * Overrides the default title, "[icon_name] icon".
   */
  title: PropTypes.string
};

export default AIcon;
