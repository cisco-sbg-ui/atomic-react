import React, {forwardRef} from "react";

import "./ADropdown.scss";

const ADropdown = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    let className = "a-dropdown";

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

export default ADropdown;
