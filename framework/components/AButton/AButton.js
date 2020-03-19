import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AButton.scss";

const AButton = forwardRef(
  (
    {
      children,
      className: propsClassName,
      disabled,
      href,
      primary,
      secondary,
      selected,
      target,
      tertiary,
      tertiaryAlt,
      tertiaryAltIcon,
      type = "button",
      ...rest
    },
    ref
  ) => {
    let className = "a-button focus-box-shadow a-button--";

    if (primary) {
      className += "primary";
    } else if (secondary) {
      className += "secondary";
    } else if (tertiary) {
      className += "tertiary";
    } else if (tertiaryAlt) {
      className += "tertiary-alt";
    } else if (tertiaryAltIcon) {
      className += "tertiary-icon";
    } else {
      className += "primary";
    }

    if (disabled) {
      className += " disabled";
    }

    if (selected) {
      className += " a-button--state-selected";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let TagName = "button";
    const props = {
      ...rest,
      ref,
      className
    };

    if (href) {
      TagName = "a";
      if (!disabled) {
        props.href = href;
        props.target = target;
        props.tabIndex = 0;
      }
    } else {
      props.disabled = disabled;
      props.type = type;
    }

    return <TagName {...props}>{children}</TagName>;
  }
);

AButton.defaultProps = {
  type: "button"
};

AButton.propTypes = {
  /**
   * A class name to append to the component.
   */
  className: PropTypes.string,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
  /**
   * If specified, the component will render as an HTML link.
   */
  href: PropTypes.string,
  /**
   * Toggles the `primary` style variant. If no style variant is chosen, `primary` is applied.
   */
  primary: PropTypes.bool,
  /**
   * Toggles the `secondary` style variant.
   */
  secondary: PropTypes.bool,
  /**
   * Toggles the `selected` state. For use in toggle button group.
   */
  selected: PropTypes.bool,
  /**
   * If the `href` property is defined, the target can be set (ex: `_blank`, `_self`, `_parent`, `_top`)
   */
  target: PropTypes.string,
  /**
   * Toggles the `tertiary` style variant.
   */
  tertiary: PropTypes.bool,
  /**
   * Toggles the `tertiaryAlt` style variant.
   */
  tertiaryAlt: PropTypes.bool,
  /**
   * Toggles the `tertiaryAltIcon` style variant.
   */
  tertiaryAltIcon: PropTypes.bool,
  /**
   * The button type.
   */
  type: PropTypes.oneOf(["button", "submit", "reset"])
};

export default AButton;
