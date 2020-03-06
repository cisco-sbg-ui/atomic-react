import React, {forwardRef} from "react";

import "./AHeader.scss";

const AHeaderToolbar = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    const className = "a-header__toolbar";

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

export default AHeaderToolbar;
