import React, {forwardRef} from "react";

import "./AFooter.scss";

const AFooter = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    let className = "a-footer";

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

export default AFooter;
