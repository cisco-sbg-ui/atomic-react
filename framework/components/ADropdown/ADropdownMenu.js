import React, {forwardRef} from "react";

import "./ADropdown.scss";

const ADropdownMenu = forwardRef(
  ({children, className: propsClassName, onClick, ...rest}, ref) => {
    let className = "a-dropdown__menu";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const clickHandler = e => {
      e.stopPropagation();
      onClick && onClick(e);
    };

    return (
      <div
        {...rest}
        onClick={clickHandler}
        role="menu"
        ref={ref}
        className={className}>
        {children}
      </div>
    );
  }
);

export default ADropdownMenu;
