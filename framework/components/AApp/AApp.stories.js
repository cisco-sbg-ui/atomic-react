import React from "react";

import {storiesOf} from "@storybook/react";

import Scrollbar from "./Scrollbar";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

storiesOf("Scrollbar", module)
  .add("with default", () => (
    <div className="atomic-ui-root">
      <Scrollbar style={{overflow: "scroll"}}>
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
      </Scrollbar>
    </div>
  ))
  .add("with horizontal", () => (
    <div className="atomic-ui-root">
      <Scrollbar direction="horizontal">
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
      </Scrollbar>
    </div>
  ))
  .add("with vertical", () => (
    <div className="atomic-ui-root">
      <Scrollbar direction="vertical" style={{maxHeight: 100}}>
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
      </Scrollbar>
    </div>
  ))
  .add("with dark theme", () => (
    <div className="atomic-ui-root theme-dusk">
      <Scrollbar style={{overflow: "scroll"}}>
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
      </Scrollbar>
    </div>
  ))
  .add("with horizontal and dark theme", () => (
    <div className="atomic-ui-root theme-dusk">
      <Scrollbar direction="horizontal">
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
      </Scrollbar>
    </div>
  ))
  .add("with vertical and dark theme", () => (
    <div className="atomic-ui-root theme-dusk">
      <Scrollbar direction="vertical" style={{maxHeight: 100}}>
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
        <br />
        {loremIpsum}
      </Scrollbar>
    </div>
  ));
