import React, {forwardRef} from "react";

import "./ADropdown.scss";

const ADropdown = forwardRef(
  ({children, className: propsClassName, onMouseDown, ...rest}, ref) => {
    let className = "a-dropdown";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div
        {...rest}
        ref={ref}
        className={className}
        onMouseDown={(e) => {
          e.preventDefault();
          onMouseDown && onMouseDown(e);
        }}>
        {children}
      </div>
    );
  }
);

ADropdown.displayName = "ADropdown";

export default ADropdown;
