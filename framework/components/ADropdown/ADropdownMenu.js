import PropTypes from "prop-types";
import React, {forwardRef, useEffect, useRef, useState} from "react";

import "./ADropdown.scss";
import {keyCodes} from "../../utils/helpers";
import {useCombinedRefs} from "../../utils/hooks";

const ADropdownMenu = forwardRef(
  (
    {
      children,
      className: propsClassName,
      onBlur,
      onClick,
      onClose,
      onKeyDown,
      open,
      role = "menu",
      ...rest
    },
    ref
  ) => {
    const menuRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, menuRef);
    const [launcherElement, setLauncherElement] = useState(null);

    useEffect(() => {
      if (open) {
        setLauncherElement(document.activeElement);
        combinedRef.current.focus();
      }
    }, [open]);

    let className = "a-dropdown__menu";

    if (open) {
      className += " a-dropdown__menu--is-active";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const getPrevious = () => {
      const items = Array.from(
        combinedRef.current.querySelectorAll(".a-dropdown__item[tabindex]")
      );
      return (
        items[items.findIndex(x => x.isSameNode(document.activeElement)) - 1] ||
        items[items.length - 1]
      );
    };

    const getNext = () => {
      const items = Array.from(
        combinedRef.current.querySelectorAll(".a-dropdown__item[tabindex]")
      );
      return (
        items[items.findIndex(x => x.isSameNode(document.activeElement)) + 1] ||
        items[0]
      );
    };

    const blurHandler = e => {
      onBlur && onBlur(e);
      if (
        !e.relatedTarget ||
        !e.relatedTarget.closest(".a-dropdown__menu") ||
        !e.relatedTarget
          .closest(".a-dropdown__menu")
          .isSameNode(combinedRef.current)
      ) {
        onClose && onClose(e);
      }
    };

    const closeHandler = e => {
      launcherElement && launcherElement.focus();
      onClose && onClose(e);
    };

    const clickHandler = e => {
      onClick && onClick(e);
      closeHandler(e);
    };

    const keyDownHandler = e => {
      if (onClose && [keyCodes.esc, keyCodes.enter].includes(e.keyCode)) {
        e.preventDefault();
        closeHandler(e);
      } else if (e.keyCode === keyCodes.tab) {
        closeHandler(e);
      } else if (e.keyCode === keyCodes.up) {
        e.preventDefault();
        const previous = getPrevious();
        previous && previous.focus();
      } else if (e.keyCode === keyCodes.down) {
        e.preventDefault();
        const next = getNext();
        next && next.focus();
      }

      onKeyDown && onKeyDown(e);
    };

    return (
      <div
        {...rest}
        className={className}
        onBlur={blurHandler}
        onClick={clickHandler}
        onKeyDown={keyDownHandler}
        role={role}
        ref={combinedRef}
        tabIndex={-1}>
        {children}
      </div>
    );
  }
);

ADropdownMenu.propTypes = {
  /**
   * Handles the request to close the menu.
   */
  onClose: PropTypes.func,
  /**
   * Toggles the `open` state.
   */
  open: PropTypes.bool,
  /**
   * Assigns an accessibility role.
   */
  role: PropTypes.string
};

export default ADropdownMenu;
