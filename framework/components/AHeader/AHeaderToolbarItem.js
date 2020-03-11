import React, {forwardRef} from "react";

import "./AHeader.scss";

const AHeaderToolbarItem = forwardRef(
  ({children, className: propsClassName, href, target, ...rest}, ref) => {
    const className = "a-header__toolbar-item";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let TagName = "div";
    const props = {
      ...rest,
      ref,
      className,
      tabIndex: 0
    };

    if (href) {
      TagName = "a";
      props.href = href;
      props.target = target;
    }

    return <TagName {...props}>{children}</TagName>;
  }
);

export default AHeaderToolbarItem;
