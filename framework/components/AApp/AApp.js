import PropTypes from "prop-types";
import React, {createRef, forwardRef} from "react";

import {ATheme} from "../ATheme";
import AAppContext from "./AAppContext";
import "./AApp.scss";

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
    const mountPointRef = createRef();

    const appContext = {
      mountPoint: () =>
        mountPointRef.current.closest(".a-app").querySelector(".a-app--mount")
    };

    return (
      <ATheme
        {...rest}
        ref={ref}
        className={className}
        persist={persistTheme}
        defaultTheme={defaultTheme}>
        <AAppContext.Provider value={appContext}>
          <div className={wrapClassName}>{children}</div>
          <div ref={mountPointRef} className="a-app--mount"></div>
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

export default AApp;
