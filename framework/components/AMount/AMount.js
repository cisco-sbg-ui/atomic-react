import PropTypes from "prop-types";
import React, {forwardRef, useContext, useRef} from "react";

import AAppContext from "../AApp/AAppContext";
import {useCombinedRefs} from "../../utils/hooks";

const AMount = forwardRef(
  ({children, className: propsClassName, component, ...rest}, ref) => {
    const {toasts, setToasts} = useContext(AAppContext);
    const newWrapRef = useRef(null);
    const newAppRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, newAppRef);

    let className = "a-mount";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const TagName = component || "div";

    const appContext = {
      appRef: combinedRef,
      wrapRef: newWrapRef,
      toasts,
      setToasts
    };

    return (
      <TagName {...rest} ref={combinedRef} className={className}>
        <AAppContext.Provider value={appContext}>
          <div ref={newWrapRef} className="a-mount--wrap">
            {children}
          </div>
        </AAppContext.Provider>
      </TagName>
    );
  }
);

AMount.propTypes = {
  /**
   * Sets the base component.
   */
  component: PropTypes.elementType
};

AMount.displayName = "AMount";

export default AMount;
