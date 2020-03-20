import PropTypes from "prop-types";
import React, {createRef, forwardRef} from "react";

import AAppContext from "./AAppContext";
import "./AApp.scss";

const AApp = forwardRef(
  (
    {
      animations = true,
      children,
      className: propsClassName,
      scrollbars = true,
      theme,
      ...rest
    },
    ref
  ) => {
    let className = "a-app";

    if (animations) {
      className += " a-app--animated";
    }

    className += theme === "dusk" ? " theme--dusk" : " theme--default";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let wrapClassName = "a-app--wrap";
    if (scrollbars) {
      wrapClassName += " a-app--scrollbars";
    }

    const mountPointRef = createRef();

    const appContext = {
      mountPoint: () =>
        mountPointRef.current.closest(".a-app").querySelector(".a-app--mount")
    };

    return (
      <div {...rest} ref={ref} className={className}>
        <AAppContext.Provider value={appContext}>
          <div className={wrapClassName}>{children}</div>
          <div ref={mountPointRef} className="a-app--mount"></div>
        </AAppContext.Provider>
      </div>
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
   * Toggles styled scrollbars.
   */
  scrollbars: PropTypes.bool,
  /**
   * Sets the application theme.
   */
  theme: PropTypes.oneOf(["default", "dusk"])
};

export default AApp;
