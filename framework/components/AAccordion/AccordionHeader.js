import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import AIcon from "../AIcon/AIcon";

const AccordionHeader = forwardRef(
  (
    {
      actions,
      chevron,
      children,
      className: propsClassName,
      collapsed,
      id,
      style
    },
    ref
  ) => {
    let className = "accordion__header";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let chevronClassName = `accordion__toggle ${
      collapsed ? "icon-chevron-right" : "icon-chevron-down"
    }`;

    return (
      <div
        tabIndex="0"
        ref={ref}
        key={id}
        className={className}
        id={id}
        style={style}>
        {chevron && <i className={chevronClassName} />}
        <a className="accordion__link">{children}</a>
        {(actions === true && (
          <AIcon className="accordion-icon">icon-information</AIcon>
        )) ||
          actions}
      </div>
    );
  }
);

AccordionHeader.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  chevron: PropTypes.bool,
  collapsed: PropTypes.bool
};

export default AccordionHeader;
