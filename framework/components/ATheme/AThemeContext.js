import React from "react";

const AThemeContext = React.createContext({
  currentTheme: "default",
  setCurrentTheme: () => {}
});

export default AThemeContext;
