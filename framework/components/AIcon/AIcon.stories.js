import React from "react";

import {storiesOf} from "@storybook/react";

import AIcon from "./AIcon.js";
import Icons from "./icons.json";

storiesOf("Icons", module).add("default", () => (
  <div>
    {Object.keys(Icons).map(x => (
      <AIcon key={x}>{x}</AIcon>
    ))}
  </div>
));
