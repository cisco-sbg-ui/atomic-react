import PropTypes from "prop-types";
import React, {forwardRef, useEffect} from "react";

import Fonts from "./fonts.js";
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
    useEffect(() => {
      if (!document.querySelector("#atomic-fonts-styles")) {
        document.head.innerHTML += `<style id="atomic-fonts-styles" type="text/css">${Fonts}</style>`;
      }
    });

    let className = "a-app";

    if (animations) {
      className += " a-app--animated";
    }

    if (theme === "dusk") {
      className += " theme--dusk";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let wrapClassName = "a-app--wrap";
    if (scrollbars) {
      wrapClassName += " a-app--scrollbars";
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <div className={wrapClassName}>{children}</div>
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
