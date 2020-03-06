import React, {forwardRef} from "react";

import "./AHeader.scss";

const AHeader = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    const className = "a-header";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <header {...rest} ref={ref} className={className}>
        {children}
      </header>
    );
  }
);

export default AHeader;
