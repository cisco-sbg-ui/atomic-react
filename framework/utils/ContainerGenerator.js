import React, {forwardRef} from "react";

export default defaultClassName =>
  forwardRef(({children, className: propsClassName, ...rest}, ref) => {
    let className = defaultClassName;

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  });
