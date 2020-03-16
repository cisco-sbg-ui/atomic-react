import React, {forwardRef} from "react";

import "./AFooter.scss";

const AFooterLegal = forwardRef(
  ({children, className: propsClassName, ...rest}, ref) => {
    let className = "a-footer__legal";

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

export default AFooterLegal;
