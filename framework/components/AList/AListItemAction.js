import React from "react";

import "./AList.scss";

export default ({children, className: propsClassName, ...rest}) => {
  let className = "a-list-item__action";

  if (propsClassName) {
    className += ` ${propsClassName}`;
  }

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
};
