import React, {useEffect} from "react";

import AButton from "../framework/components/AButton";
import AButtonGroup from "../framework/components/AButtonGroup";
import {useATheme} from "../framework/components/ATheme";

const DUSK_CLASS = "theme--dusk";
const WHITE_CLASS = "theme--default";

const ThemeSwitcher = () => {
  const {currentTheme, setCurrentTheme} = useATheme();

  useEffect(() => {
    if (currentTheme === "dusk") {
      document.querySelector("html").classList.add(DUSK_CLASS);
      document.querySelector("html").classList.remove(WHITE_CLASS);
      document.querySelector("html").style.backgroundColor = "#18191d";
    } else {
      document.querySelector("html").classList.add(WHITE_CLASS);
      document.querySelector("html").classList.remove(DUSK_CLASS);
      document.querySelector("html").style.backgroundColor = "#ffffff";
    }
  }, [currentTheme]);

  return (
    <div style={{textAlign: "left", display: "inline-block"}}>
      <span
        style={{
          display: "block",
          fontSize: 14,
          color: currentTheme === "dusk" ? "#c6c7ca" : "#737373"
        }}>
        Theme
      </span>
      <AButtonGroup
        style={{verticalAlign: "middle"}}
        selectedValues={currentTheme === "dusk" ? [currentTheme] : ["default"]}
        onChange={(_, selectedValues) => {
          setCurrentTheme(selectedValues[0]);
          window.parent.dispatchEvent(
            new CustomEvent("themeChanged", {
              detail: {
                currentTheme: selectedValues[0]
              }
            })
          );
        }}>
        <AButton value="default">Light</AButton>
        <AButton value="dusk">Dusk</AButton>
      </AButtonGroup>
    </div>
  );
};

ThemeSwitcher.displayName = "ThemeSwitcher";

export default ThemeSwitcher;
