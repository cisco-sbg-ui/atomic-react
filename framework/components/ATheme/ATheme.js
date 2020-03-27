import PropTypes from "prop-types";
import React, {forwardRef, useState} from "react";

import AThemeContext from "./AThemeContext";

const LS_KEY = "persist-atomic-react-theme";

const ATheme = forwardRef(
  (
    {children, className: propsClassName, defaultTheme, persist, ...rest},
    ref
  ) => {
    let initialTheme = "default";
    if (persist) {
      // if localstorage has key
      initialTheme = localStorage.hasOwnProperty(LS_KEY)
        ? JSON.parse(localStorage.getItem(LS_KEY))
        : // otherwise fall back to browser/os prefs
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else if (["dusk", "default"].includes(defaultTheme)) {
      initialTheme = defaultTheme;
    }

    const [currentTheme, setCurrentTheme] = useState(initialTheme);

    const themeContext = {
      currentTheme,
      setCurrentTheme: (theme) => {
        const newTheme = theme === "dusk" ? theme : "default";
        persist && localStorage.setItem(LS_KEY, newTheme);
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

export default ATheme;
