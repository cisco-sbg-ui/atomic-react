import React from "react";

import {storiesOf} from "@storybook/react";

import Divider from "./ADivider.js";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

storiesOf("Divider", module)
  .add("with default, light, and lighter", () => (
    <div>
      {loremIpsum}
      <Divider />
      {loremIpsum}
      <Divider light />
      {loremIpsum}
      <Divider lighter />
      {loremIpsum}
    </div>
  ))
  .add("with dark mode", () => (
    <div>
      {loremIpsum}
      <Divider />
      {loremIpsum}
      <Divider light />
      {loremIpsum}
      <Divider lighter />
      {loremIpsum}
    </div>
  ));
