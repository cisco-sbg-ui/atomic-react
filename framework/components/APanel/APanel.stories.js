import React from "react";

import {storiesOf} from "@storybook/react";

import "./APanel.scss";

import AIcon from "../AIcon/AIcon";
import Panel from "./Panel";
import PanelBody from "./PanelBody";
import PanelFooter from "./PanelFooter";
import PanelHeader from "./PanelHeader";
import PanelTitle from "./PanelTitle";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

storiesOf("Panel", module)
  .add("with default", () => (
    <div className="atomic-ui-root">
      <Panel>
        <PanelHeader>
          <PanelTitle>Panel Title</PanelTitle>
          <AIcon className="panel-icon">settings</AIcon>
        </PanelHeader>
        <PanelBody>{loremIpsum}</PanelBody>
        <PanelFooter>Panel Footer</PanelFooter>
      </Panel>
    </div>
  ))
  .add("with grey", () => (
    <div className="atomic-ui-root">
      <Panel type="grey">
        <PanelHeader>
          <PanelTitle>Panel Title</PanelTitle>
          <AIcon className="panel-icon">icon-settings</AIcon>
        </PanelHeader>
        <PanelBody>{loremIpsum}</PanelBody>
        <PanelFooter>Panel Footer</PanelFooter>
      </Panel>
    </div>
  ))
  .add("with white", () => (
    <div className="atomic-ui-root">
      <Panel type="white">
        <PanelHeader>
          <PanelTitle>Panel Title</PanelTitle>
          <AIcon className="panel-icon">icon-settings</AIcon>
        </PanelHeader>
        <PanelBody>{loremIpsum}</PanelBody>
        <PanelFooter>Panel Footer</PanelFooter>
      </Panel>
    </div>
  ))
  .add("with dark theme", () => (
    <div className="atomic-ui-root theme-dusk">
      <Panel type="grey">
        <PanelHeader>
          <PanelTitle>Panel Title</PanelTitle>
          <AIcon className="panel-icon">icon-settings</AIcon>
        </PanelHeader>
        <PanelBody>{loremIpsum}</PanelBody>
        <PanelFooter>Panel Footer</PanelFooter>
      </Panel>
    </div>
  ))
  .add("with grey and dark theme", () => (
    <div className="atomic-ui-root theme-dusk">
      <Panel type="grey">
        <PanelHeader>
          <PanelTitle>Panel Title</PanelTitle>
          <AIcon className="panel-icon">icon-settings</AIcon>
        </PanelHeader>
        <PanelBody>{loremIpsum}</PanelBody>
        <PanelFooter>Panel Footer</PanelFooter>
      </Panel>
    </div>
  ))
  .add("with white and dark theme", () => (
    <div className="atomic-ui-root theme-dusk">
      <Panel type="white">
        <PanelHeader>
          <PanelTitle>Panel Title</PanelTitle>
          <AIcon className="panel-icon">icon-settings</AIcon>
        </PanelHeader>
        <PanelBody>{loremIpsum}</PanelBody>
        <PanelFooter>Panel Footer</PanelFooter>
      </Panel>
    </div>
  ))
  .add("with small title", () => (
    <div className="atomic-ui-root">
      <Panel>
        <PanelHeader>
          <PanelTitle small>Panel Title</PanelTitle>
          <AIcon className="panel-icon">icon-settings</AIcon>
        </PanelHeader>
        <PanelBody>{loremIpsum}</PanelBody>
        <PanelFooter>Panel Footer</PanelFooter>
      </Panel>
    </div>
  ));
