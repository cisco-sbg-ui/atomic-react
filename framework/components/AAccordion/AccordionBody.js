import React, {forwardRef} from "react";

export default forwardRef(
  ({children, className: propsClassName, id, style}, ref) => {
    let className = "accordion__body";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div
        ref={ref}
        key={id}
        className={className}
        id={id}
        style={style}
        onClick={e => e.stopPropagation()}
        onKeyPress={e => e.stopPropagation()}>
        {children}
      </div>
    );
  }
);
