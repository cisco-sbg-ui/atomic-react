import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import AMenuBase from "../AMenuBase";
import AContextualNotification from "../AContextualNotification";
import "./AContextualNotificationMenu.scss";

const AContextualNotificationMenu = forwardRef(
  (
    {
      anchorRef,
      children,
      className: propsClassName,
      onClose,
      open,
      placement,
      role = "menu",
      variant,
      ...rest
    },
    ref
  ) => {
    let className = `a-contextual-notification-menu`;
    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <AContextualNotification
        {...rest}
        component={AMenuBase}
        ref={ref}
        role={role}
        className={className}
        onClose={onClose}
        open={open}
        placement={placement}
        anchorRef={anchorRef}
        pointer={true}
        variant={variant}>
        {children}
      </AContextualNotification>
    );
  }
);

AContextualNotificationMenu.propTypes = {
  /**
   * The reference to the menu anchor.
   */
  anchorRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]).isRequired,
  /**
   * Handles the request to close the menu.
   */
  onClose: PropTypes.func,
  /**
   * Toggles the `open` state.
   */
  open: PropTypes.bool,
  /**
   * The placement of the menu.
   */
  placement: PropTypes.oneOf([
    "top",
    "top-right",
    "right-top",
    "right",
    "right-bottom",
    "bottom-right",
    "bottom",
    "bottom-left",
    "left-bottom",
    "left",
    "left-top",
    "top-left"
  ]),
  /**
   * Sets the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role.
   */
  role: PropTypes.string,
  /**
   * Sets the display variant.
   */
  variant: PropTypes.oneOf(["success", "info", "warning", "danger"])
};

AContextualNotificationMenu.displayName = "AContextualNotificationMenu";

export default AContextualNotificationMenu;
