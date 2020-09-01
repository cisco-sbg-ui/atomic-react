import PropTypes from "prop-types";
import React, {forwardRef, useContext, useRef, useState} from "react";

import {ATheme} from "../ATheme";
import AAppContext from "./AAppContext";
import {useCombinedRefs} from "../../utils/hooks";
import "./AApp.scss";

const AToastPlate = () => {
  const {toasts} = useContext(AAppContext);
  return (
    !toasts.length || (
      <div className="a-toast-plate">{toasts.map((x) => x.component)}</div>
    )
  );
};

const AApp = forwardRef(
  (
    {
      animations = true,
      children,
      className: propsClassName,
      defaultTheme,
      persistTheme = false,
      scrollbars = true,
      ...rest
    },
    ref
  ) => {
    const [toasts, setToasts] = useState([]);

    let className = "a-app";

    if (animations) {
      className += " a-app--animated";
    }

    if (scrollbars) {
      className += " a-app--scrollbars";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let wrapClassName = "a-app--wrap";
    const appRef = useRef(null);
    const wrapRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, appRef);

    const appContext = {
      appRef: combinedRef,
      wrapRef,
      toasts,
      setToasts
    };

    return (
      <ATheme
        {...rest}
        ref={combinedRef}
        className={className}
        persist={persistTheme}
        defaultTheme={defaultTheme}>
        <AAppContext.Provider value={appContext}>
          <div ref={wrapRef} className={wrapClassName}>
            {children}
          </div>
          <AToastPlate />
        </AAppContext.Provider>
      </ATheme>
    );
  }
);

AApp.defaultProps = {
  animations: true,
  scrollbars: true
};

AApp.propTypes = {
  /**
   * Toggles animations.
   */
  animations: PropTypes.bool,
  /**
   * Sets the default theme.
   */
  defaultTheme: PropTypes.oneOf(["default", "dusk"]),
  /**
   * Toggles whether the theme is persisted in local storage.
   */
  persistTheme: PropTypes.bool,
  /**
   * Toggles styled scrollbars.
   */
  scrollbars: PropTypes.bool
};

AApp.displayName = "AApp";

export default AApp;
