import React from "react";

import "./ADropdown.scss";

const ADropdownMenu = ({children, className: propsClassName, ...rest}) => {
  let className = "a-dropdown__menu";

  if (propsClassName) {
    className += ` ${propsClassName}`;
  }

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
};

export default ADropdownMenu;
