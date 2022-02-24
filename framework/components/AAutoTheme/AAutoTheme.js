import React, { useCallback, useMemo, useState, useRef } from "react";
import { useIsomorphicLayoutEffect, useMediaQuery } from "../../utils/hooks";
import { useATheme } from "../ATheme";
import AAutoThemeContext from "./AAutoThemeContext"

const persistKey = 'atomic-react-auto-theme';

const AAutoTheme = (props) => {
    const { children, } = props;
    const {persist, setCurrentTheme, currentTheme} = useATheme();
    // When user turns off auto theme, use the previous theme they manually
    // selected
    const prevSelectedTheme = useRef(currentTheme);
    const [isEnabled, setIsEnabled] = useState(false);
    const { matches, } = useMediaQuery({
        mediaQuery: "(prefers-color-scheme: dark)",
        onChange: (e) => {
          if (isEnabled) {
            setCurrentTheme(e?.target?.matches ? "dusk" : "default");
          }
        }
      });

    const enable = useCallback(() => {
      setIsEnabled(true);
      prevSelectedTheme.current = currentTheme;
      setCurrentTheme(matches ? "dusk" : "default");
      if (persist) {
        localStorage.setItem(persistKey, "enabled");
      }
    }, [currentTheme, matches, persist, setCurrentTheme, setIsEnabled]);

    const disable = useCallback(() => {
      setIsEnabled(false);
      setCurrentTheme(prevSelectedTheme.current);
      if (persist) {
        localStorage.setItem(persistKey, "disabled");
      }
    }, [setCurrentTheme, setIsEnabled, persist]);

    useIsomorphicLayoutEffect(() => {
      if (persist && localStorage.getItem(persistKey) === "enabled") {
        enable();
        return;
      }
      if (persist && localStorage.getItem(persistKey) === "disabled") {
        disable();
        return;
      }
    }, []);

    const ctx = useMemo(() => ({
        enabled: isEnabled,
        enable,
        disable,
        toggle: () => {
          isEnabled ? disable() : enable();
        }
    }), [isEnabled, enable, disable]);

    return (
        <AAutoThemeContext.Provider value={ctx}>
            {children}
        </AAutoThemeContext.Provider>
    )
};

AAutoTheme.displayName = "AAutoTheme";

export default AAutoTheme;