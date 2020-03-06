import React, {forwardRef} from "react";

import "./AHeader.scss";

const AHeaderTitle = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    const className = "a-header__title";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} tabIndex="0" ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

export default AHeaderTitle;
