import PropTypes from "prop-types";
import React, {forwardRef, useContext} from "react";

import AButtonGroupContext from "../AButtonGroup/AButtonGroupContext";
import "./AButtonCard.scss";

const AButtonCard = forwardRef(
  (
    {
      children,
      className: propsClassName,
      component,
      disabled,
      description,
      href,
      onClick,
      selected,
      target,
      type = "button",
      value,
      ...rest
    },
    ref
  ) => {
    const {selectedValues, toggleValue} = useContext(AButtonGroupContext);

    let className = "a-button-card focus-box-shadow a-button-card--";

    if (selected) {
      className += "selected";
    }

    if (disabled) {
      className += " disabled";
    }

    if (selectedValues && selectedValues.includes(value)) {
      className += " a-button--state-selected";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let TagName = "button";
    const props = {
      ...rest,
      ref,
      className,
      onClick: (e) => {
        if (toggleValue) {
          toggleValue(value);
        }

        onClick && onClick(e);
      }
    };

    if (href || component) {
      props.tabIndex = 0;
    }

    if (href) {
      TagName = "a";
      if (!disabled) {
        props.href = href;
        props.target = target;
      }
    } else if (component) {
      TagName = component;
      props.disabled = disabled;
      props.value = value;
      props.target = target;
    } else {
      props.disabled = disabled;
      props.type = type;
      props.value = value;
    }

    return <TagName {...props}>{children}</TagName>;
  }
);

AButtonCard.propTypes = {
  /**
   * Sets the base component. Useful for integrating with routers.
   */
  component: PropTypes.elementType,
  /**
   * Toggles the `disabled` state.
   */
  disabled: PropTypes.bool,
  /**
   * If specified, the component will render as an HTML link.
   */
  href: PropTypes.string,
  /**
   * Signifies an icon-only button.
   */
  description: PropTypes.string,
  /**
   * Signifies the button's description.
   */
  default: PropTypes.bool,
  /**
   * Toggles the `secondary` style variant.
   */
  selected: PropTypes.bool,
  /**
   * If the `href` or `component` props is set, the target can be set (ex: `_blank`, `_self`, `_parent`, `_top`)
   */

  type: PropTypes.oneOf(["button", "submit", "reset"])
};

AButtonCard.displayName = "AButtonCard";

export default AButtonCard;
