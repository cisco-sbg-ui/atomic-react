import React, {forwardRef} from "react";

import "./AList.scss";

const AListItemTitle = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    let className = "a-list-item__title";

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

export default AListItemTitle;
