import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./AButtonCard.scss";

const AButtonCardTitle = forwardRef((
  {className: propsClassName = "", children, ...rest}, ref) => {
    const containerClassName = " a-button-card__title";
    const className = propsClassName + containerClassName;

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

AButtonCardTitle.propTypes = {
  /**
   * String representing class names to be passed to component container
   */
  className: PropTypes.bool
};

AButtonCardTitle.displayName = "AButtonCardTitle";

const AButtonCardBody = forwardRef((
  {className: propsClassName = "", children, ...rest}, ref) => {
    const containerClassName = " a-button-card__body";
    const className = propsClassName + containerClassName;

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

AButtonCardBody.propTypes = {
  /**
   * String representing class names to be passed to component container
   */
  className: PropTypes.bool
};

AButtonCardBody.displayName = "AButtonCardBody";


const AButtonCard = forwardRef(
  (
    {
      children,
      className: propsClassName,
      component,
      disabled,
      href,
      selected,
      target,
      type = "button",
      value,
      ...rest
    },
    ref
  ) => {
    let className = "a-button-card focus-box-shadow a-button-card--";

    if (selected) {
      className += "selected";
    }

    if (disabled) {
      className += "disabled";
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
  default: PropTypes.bool,
  /**
   * Toggles the `secondary` style variant.
   */
  selected: PropTypes.bool,
  /**
   * If the `href` or `component` props is set, the target can be set (ex: `_blank`, `_self`, `_parent`, `_top`)
   */
};

AButtonCard.displayName = "AButtonCard";

export {AButtonCard, AButtonCardTitle, AButtonCardBody};
