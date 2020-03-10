import PropTypes from "prop-types";
import React, {forwardRef, useContext, useEffect, useState} from "react";

import ATabContext from "./ATabContext";
import "./ATabs.scss";

const ATab = forwardRef(
  (
    {
      className: propsClassName,
      children,
      href,
      onClick,
      selected,
      target,
      ...rest
    },
    ref
  ) => {
    const [tabId, setTabId] = useState(null);
    const [isSelected, setIsSelected] = useState(null);
    const {register, tabChanged, setTabChanged} = useContext(ATabContext);
    useEffect(() => {
      if (!tabId) {
        setTabId(register(selected));
      }

      setIsSelected(tabChanged === tabId);
    });

    let className = "a-tab-group__tab";
    if (isSelected) {
      className += " a-tab-group__tab--selected";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <a
        {...rest}
        ref={ref}
        role="tab"
        tabIndex="0"
        className={className}
        href={href}
        target={target}
        aria-selected={isSelected}
        onClick={e => {
          setTabChanged(tabId);
          onClick && onClick(e);
        }}>
        {children}
      </a>
    );
  }
);

ATab.contextType = ATabContext;

ATab.propTypes = {
  /**
   * Toggles the selected state.
   */
  selected: PropTypes.bool
};

export default ATab;
