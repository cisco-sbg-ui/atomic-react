import React, {useEffect} from "react";
//import {useColorMode} from "theme-ui";

import ASwitch from "../framework/components/ASwitch";
import {useATheme} from "../framework/components/ATheme";

const ThemeSwitcher = () => {
  const {currentTheme, setCurrentTheme} = useATheme();
  //const [, setColorMode] = useColorMode();
  //useEffect(() => {
  //  setColorMode(currentTheme === "dusk" ? "dark" : "light");
  //}, [currentTheme, setColorMode]);

  return (
    <ASwitch
      checked={currentTheme === "dusk"}
      className="flex-grow-1"
      onClick={() =>
        setCurrentTheme(currentTheme === "dusk" ? "default" : "dusk")
      }>
      Dusk Theme
    </ASwitch>
  );
};

ThemeSwitcher.displayName = "ThemeSwitcher";

export default ThemeSwitcher;
