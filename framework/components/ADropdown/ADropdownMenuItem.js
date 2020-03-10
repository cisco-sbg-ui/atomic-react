import PropTypes from "prop-types";
import React from "react";

import "./ADropdown.scss";

const ADropdownMenuItem = ({
  children,
  className: propsClassName,
  selected,
  ...rest
}) => {
  let className = "a-dropdown__item";

  if (selected) {
    className += " a-dropdown__item--state-selected";
  }

  if (propsClassName) {
    className += ` ${propsClassName}`;
  }

  return (
    <div {...rest} tabIndex={0} className={className}>
      {children}
    </div>
  );
};

ADropdownMenuItem.propTypes = {
  /**
   * Toggles the selected state.
   */
  selected: PropTypes.bool
};

export default ADropdownMenuItem;
