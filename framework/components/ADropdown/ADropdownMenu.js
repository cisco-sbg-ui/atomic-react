import React, {forwardRef} from "react";

import "./ADropdown.scss";

const ADropdownMenu = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    let className = "a-dropdown__menu";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} role="menu" ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

export default ADropdownMenu;
