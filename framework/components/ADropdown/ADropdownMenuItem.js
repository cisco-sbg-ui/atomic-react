import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ADropdown.scss";
import {keyCodes} from "../../utils/helpers";

const ADropdownMenuItem = forwardRef(
  (
    {
      children,
      className: propsClassName,
      component,
      href,
      onClick,
      onKeyDown,
      role = "menuitem",
      selected,
      target,
      ...rest
    },
    ref
  ) => {
    let className = "a-dropdown__item";

    if (selected) {
      className += " a-dropdown__item--state-selected";
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
      onKeyDown: (e) => {
        if (onClick && e.keyCode === keyCodes.enter) {
          e.preventDefault();
          onClick(e);
        }

        onKeyDown && onKeyDown(e);
      },
      role
    };

    if (href) {
      TagName = "a";
      props.href = href;
      props.target = target;
    }

    if (href || onClick || component) {
      props.tabIndex = 0;
    }

    if (component) {
      TagName = component;
    }

    return <TagName {...props}>{children}</TagName>;
  }
);

ADropdownMenuItem.propTypes = {
  /**
   * Sets the base component. Useful for integrating with routers.
   */
  component: PropTypes.elementType,
  /**
   * If specified, the component will render as an HTML link.
   */
  href: PropTypes.string,
  /**
   * Sets the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role.
   */
  role: PropTypes.string,
  /**
   * Toggles the `selected` state.
   */
  selected: PropTypes.bool,
  /**
   * If the `href` property is defined, the target can be set (ex: `_blank`, `_self`, `_parent`, `_top`)
   */
  target: PropTypes.string
};

ADropdownMenuItem.displayName = "ADropdownMenuItem";

export default ADropdownMenuItem;
