import PropTypes from "prop-types";
import React, {forwardRef, useContext, useEffect, useState} from "react";

import ATabContext from "./ATabContext";
import {keyCodes} from "../../utils/helpers";
import "./ATabs.scss";

let tabCounter = 1;

const ATab = forwardRef(
  (
    {
      className: propsClassName,
      children,
      component,
      href,
      onClick,
      onKeyDown,
      selected,
      tabKey,
      target,
      ...rest
    },
    ref
  ) => {
    const [tabId, setTabId] = useState(null);
    const [isSelected, setIsSelected] = useState(null);
    const {tabChanged, setTabChanged} = useContext(ATabContext);
    useEffect(() => {
      if (tabKey) return;
      if (!tabId) {
        const index = tabCounter++;
        setTabId(index);
        if (selected) setTabChanged(index);
      }

      setIsSelected(tabChanged === tabId);
    }, [setIsSelected, selected, setTabChanged, tabChanged, tabId, tabKey]);

    useEffect(() => {
      if (tabKey) return;
      if (!selected && isSelected) {
        setTabChanged(-1);
        setIsSelected(false);
      }
    }, [selected, tabKey]); // eslint-disable-line react-hooks/exhaustive-deps

    let className = "a-tab-group__tab";
    if ((tabKey && selected) || isSelected) {
      className += " a-tab-group__tab--selected";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let TagName = "div";
    const props = {
      ...rest,
      "aria-selected": Boolean((tabKey && selected) || isSelected),
      ref,
      className,
      onClick: (e) => {
        !tabKey && setTabChanged(tabId);
        onClick && onClick(e);
      },
      onKeyDown: (e) => {
        if (!href && [keyCodes.enter].includes(e.keyCode)) {
          e.preventDefault();
          !tabKey && setTabChanged(tabId);
          onClick && onClick(e);
        } else {
          onKeyDown && onKeyDown(e);
        }
      },
      role: "tab",
      tabIndex: 0
    };

    if (href) {
      TagName = "a";
      props.href = href;
      props.target = target;
    }

    if (component) {
      TagName = component;
    }

    return <TagName {...props}>{children}</TagName>;
  }
);

ATab.propTypes = {
  /**
   * Sets the base component. Useful for integrating with routers.
   */
  component: PropTypes.elementType,
  /**
   * If specified, the component will render as an HTML link.
   */
  href: PropTypes.string,
  /**
   * Toggles the `selected` state in controlled mode. Provides the default `selected` state in uncontrolled mode.
   */
  selected: PropTypes.bool,
  /**
   * If the `href` property is defined, the target can be set (ex: `_blank`, `_self`, `_parent`, `_top`)
   */
  target: PropTypes.string
};

ATab.displayName = "ATab";

export default ATab;
