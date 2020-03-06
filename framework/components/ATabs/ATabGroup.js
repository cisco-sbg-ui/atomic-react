import PropTypes from "prop-types";
import React, {forwardRef, useState} from "react";

import ATab from "./ATab";
import "./ATabs.scss";

const ATabGroup = forwardRef(
  ({className: propsClassName, children, oversized, tall, ...rest}, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(
      children.findIndex(x => x.props.selected) || 0
    );
    let className = "a-tab-group";

    if (oversized) {
      className += " a-tab-group--size-oversized";
    } else if (tall) {
      className += " a-tab-group--size-tall";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <ul {...rest} ref={ref} className={className}>
        {children.map((x, index) =>
          React.cloneElement(x, {
            key: `tab_${index}`,
            oversized: oversized,
            selected: selectedIndex === index,
            onClick: e => {
              setSelectedIndex(index);
              if (x.onClick) x.onClick(e);
            }
          })
        )}
      </ul>
    );
  }
);

ATabGroup.propTypes = {
  /**
   * Toggle the oversized style variant.
   */
  oversized: PropTypes.bool,
  /**
   * Toggle the tall style variant.
   */
  tall: PropTypes.bool
};

export default ATabGroup;
