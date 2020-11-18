import PropTypes from "prop-types";
import React, {forwardRef, useLayoutEffect, useState} from "react";

import AThemeContext from "./AThemeContext";

const LS_KEY = "persist-atomic-react-theme";

const ATheme = forwardRef(
  (
    {children, className: propsClassName, defaultTheme, persist, ...rest},
    ref
  ) => {
    const [currentTheme, setCurrentTheme] = useState("dusk");

    useLayoutEffect(() => {
      let initialTheme = "default";
      if (persist) {
        if (Object.prototype.hasOwnProperty.call(localStorage, LS_KEY)) {
          initialTheme = localStorage.getItem(LS_KEY) === "dusk" && "dusk";
        } else if (["default", "dusk"].includes(defaultTheme)) {
          initialTheme = defaultTheme;
        } else if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          initialTheme = "dusk";
        }
      } else if (defaultTheme === "dusk") {
        initialTheme = "dusk";
      }

      setCurrentTheme(initialTheme);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const themeContext = {
      currentTheme,
      setCurrentTheme: (theme) => {
        const newTheme = theme === "dusk" ? theme : "default";
        persist && localStorage?.setItem(LS_KEY, newTheme);
        setCurrentTheme(newTheme);
      }
    };

    let className = currentTheme === "dusk" ? "theme--dusk" : "theme--default";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <AThemeContext.Provider value={themeContext}>
          {children}
        </AThemeContext.Provider>
      </div>
    );
  }
);

ATheme.propTypes = {
  /**
   * Sets the default theme.
   */
  defaultTheme: PropTypes.oneOf(["default", "dusk"]),
  /**
   * Toggles whether the theme is persisted in local storage.
   */
  persist: PropTypes.bool
};

ATheme.displayName = "ATheme";

export default ATheme;
