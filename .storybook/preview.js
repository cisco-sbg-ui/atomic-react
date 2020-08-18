import React from "react";
import {DocsContainer} from "@storybook/addon-docs/blocks";

import ThemeSwitcher from "./ThemeSwitcher";
import AApp from "../framework/components/AApp";
import {AContainer} from "../framework/components/ALayout";

document.querySelector("html").className = "theme--default a-app--scrollbars";

const HiddenFontSwatches = () => {
  return (
    <div
      aria-hidden="true"
      className="hidden-font-swatches"
      style={{position: "fixed", top: -50}}>
      <span
        className="hidden-font-swatches_1"
        style={{fontFamily: "CiscoSans", fontWeight: 100}}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_2"
        style={{fontFamily: "CiscoSans", fontWeight: 200}}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_3"
        style={{
          fontFamily: "CiscoSans",
          fontWeight: 200,
          fontStyle: "oblique"
        }}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_4"
        style={{fontFamily: "CiscoSans", fontWeight: 200, fontStyle: "italic"}}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_5"
        style={{fontFamily: "CiscoSans", fontWeight: 300}}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_6"
        style={{
          fontFamily: "CiscoSans",
          fontWeight: 300,
          fontStyle: "oblique"
        }}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_7"
        style={{fontFamily: "CiscoSans", fontWeight: 300, fontStyle: "italic"}}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_8"
        style={{fontFamily: "CiscoSans", fontWeight: 400}}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_9"
        style={{
          fontFamily: "CiscoSans",
          fontWeight: 400,
          fontStyle: "oblique"
        }}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_10"
        style={{fontFamily: "CiscoSans", fontWeight: 400, fontStyle: "italic"}}>
        Theme
      </span>
      <span
        className="hidden-font-swatches_11"
        style={{fontFamily: "CiscoSans", fontWeight: 700}}>
        Theme
      </span>
    </div>
  );
};

const DocsContainerWrapper = ({children, context}) => {
  return (
    <DocsContainer context={context}>
      <AApp persistTheme>
        <HiddenFontSwatches />
        <AContainer className="py-12 px-4">
          <div style={{textAlign: "right"}}>
            <ThemeSwitcher />
          </div>
          {children}
        </AContainer>
      </AApp>
    </DocsContainer>
  );
};

DocsContainerWrapper.displayName = "DocsContainerWrapper";

export const parameters = {
  docs: {
    container: DocsContainerWrapper
  }
};
