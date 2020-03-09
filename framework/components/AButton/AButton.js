import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AButton.scss";

const AButton = forwardRef(
  (
    {
      children,
      className: propsClassName,
      disabled,
      id,
      label,
      onClick,
      primary,
      secondary,
      selected,
      style,
      target,
      tertiary,
      tertiaryAlt,
      tertiaryAltIcon,
      to,
      type = "button"
    },
    ref
  ) => {
    let className = "a-button a-button--";

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
      ref,
      className,
      onClick,
      id,
      style
    };

    if (to) {
      TagName = "a";
      if (!disabled) {
        props.href = to;
        props.target = target;
      }
    } else {
      props.disabled = disabled;
      props.type = type;
    }

    return <TagName {...props}>{label || children}</TagName>;
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
   * A unique identifier for the label.
   */
  id: PropTypes.string,
  /**
   * The button label.
   */
  label: PropTypes.string,
  /**
   * A callback for handling the click event.
   */
  onClick: PropTypes.func,
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
   * Passes inline styles to the button.
   */
  style: PropTypes.string,
  /**
   * If the `to` property is defined, the target can be set (ex: `_blank`, `_self`, `_parent`, `_top`)
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
   * If specified, the component will render as an HTML link.
   */
  to: PropTypes.string,
  /**
   * The button type.
   */
  type: PropTypes.oneOf(["button", "submit", "reset"])
};

export default AButton;
