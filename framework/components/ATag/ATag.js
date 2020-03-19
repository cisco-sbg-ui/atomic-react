import React, {forwardRef} from "react";

import "./ATag.scss";
import {keyCodes} from "../../utils/helpers";

const ATag = forwardRef(
  (
    {
      children,
      className: propsClassName,
      href,
      onClick,
      onKeyDown,
      target,
      ...rest
    },
    ref
  ) => {
    let className = "a-tag focus-box-shadow";

    if (href || onClick) {
      className += ` interactable`;
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let TagName = "div";
    const props = {
      ...rest,
      ref,
      className,
      onClick,
      onKeyDown: e => {
        if (!href && onClick && [keyCodes.enter].includes(e.keyCode)) {
          e.preventDefault();
          onClick(e);
        } else {
          onKeyDown && onKeyDown(e);
        }
      }
    };

    if (href) {
      TagName = "a";
      props.href = href;
      props.target = target;
    }

    if (onClick) {
      props.role = "button";
    }

    if (href || onClick) {
      props.tabIndex = 0;
    }

    return <TagName {...props}>{children}</TagName>;
  }
);

export default ATag;
