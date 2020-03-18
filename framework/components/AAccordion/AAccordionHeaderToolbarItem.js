import React, {forwardRef} from "react";

import {keyCodes} from "../../utils/helpers";
import "./AAccordion.scss";

const AAccordionHeaderToolbarItem = forwardRef(
  (
    {children, className: propsClassName, href, onClick, target, ...rest},
    ref
  ) => {
    const className = "a-accordion__toolbar-item";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let TagName = "div";
    const props = {
      ...rest,
      ref,
      className,
      onClick
    };

    if (href) {
      TagName = "a";
      props.href = href;
      props.target = target;
    }

    if (onClick) {
      props.role = "button";
      props.onKeyDown = e => {
        if ([keyCodes.enter, keyCodes.space].includes(e.keyCode)) {
          e.preventDefault();
          onClick && onClick(e);
        }
      };
    }

    if (href || onClick) {
      props.tabIndex = 0;
    }

    return <TagName {...props}>{children}</TagName>;
  }
);

export default AAccordionHeaderToolbarItem;
