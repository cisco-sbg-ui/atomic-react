import React, {forwardRef} from "react";

import "./AHeader.scss";

const AHeaderNavigation = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    const className = "a-header__navigation";

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

export default AHeaderNavigation;
