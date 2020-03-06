import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ATabs.scss";

const ATab = forwardRef(
  (
    {className: propsClassName, children, tabId, oversized, selected, ...rest},
    ref
  ) => {
    let className = "a-tab-group__tab";
    if (selected) {
      className += " a-tab-group__tab--selected";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <li {...rest} ref={ref} tabIndex="0" className={className}>
        {(oversized && children) || (
          <a className="a-tab-group__link">{children}</a>
        )}
      </li>
    );
  }
);

ATab.propTypes = {
  /**
   * Toggles the selected state.
   */
  selected: PropTypes.bool
};

export default ATab;
