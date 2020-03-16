import React, {forwardRef} from "react";

import "./AAccordion.scss";

const AAccordionHeaderToolbar = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    const className = "a-accordion__toolbar";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

export default AAccordionHeaderToolbar;
