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
      if (localStorage.hasOwnProperty(LS_KEY)) {
        initialTheme = localStorage.getItem(LS_KEY) === "dusk" && "dusk";
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        initialTheme = "dusk";
      }
    } else if (defaultTheme === "dusk") {
      initialTheme = "dusk";
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
