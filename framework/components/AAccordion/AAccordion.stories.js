import React from "react";

import {storiesOf} from "@storybook/react";

import "./AAccordion.scss";

import Accordion from "./Accordion";
import AccordionCard from "./AccordionCard";
import AccordionHeader from "./AccordionHeader";
import AccordionBody from "./AccordionBody";
import AccordionBodyContent from "./AccordionBodyContent";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

storiesOf("Accordion", module)
  .add("with default", () => (
    <div className="atomic-ui-root">
      <Accordion>
        <AccordionCard>
          <AccordionHeader>Accordion Item 1</AccordionHeader>
          <AccordionBody>
            <AccordionBodyContent>{loremIpsum}</AccordionBodyContent>
          </AccordionBody>
        </AccordionCard>
        <AccordionCard>
          <AccordionHeader>Accordion Item 2</AccordionHeader>
          <AccordionBody>
            <AccordionBodyContent>{loremIpsum}</AccordionBodyContent>
          </AccordionBody>
        </AccordionCard>
        <AccordionCard>
          <AccordionHeader>Accordion Item 3</AccordionHeader>
          <AccordionBody>
            <AccordionBodyContent>{loremIpsum}</AccordionBodyContent>
          </AccordionBody>
        </AccordionCard>
      </Accordion>
    </div>
  ))
  .add("with additional features", () => (
    <div className="atomic-ui-root theme-dusk">
      <Accordion>
        <AccordionCard>
          <AccordionHeader style={{textAlign: "left"}}>
            Accordion Item 1
          </AccordionHeader>
        </AccordionCard>
        <AccordionCard collapsed={false}>
          <AccordionHeader style={{textAlign: "left"}} chevron actions>
            Accordion Item 2
          </AccordionHeader>
          <AccordionBody>
            <AccordionBodyContent>{loremIpsum}</AccordionBodyContent>
          </AccordionBody>
        </AccordionCard>
        <AccordionCard>
          <AccordionHeader style={{textAlign: "left"}} chevron actions>
            Accordion Item 3
          </AccordionHeader>
          <AccordionBody>
            <AccordionBodyContent>{loremIpsum}</AccordionBodyContent>
          </AccordionBody>
        </AccordionCard>
      </Accordion>
    </div>
  ))
  .add("with platform", () => {
    const data = [
      {
        header: {
          text: "Applications",
          actions: <i className="icon-ellipsis-horizontal" />
        }
      },
      {
        collapsed: true,
        header: {
          text: "Marketplace Recommended",
          chevron: true,
          actions: <i className="icon-ellipsis-horizontal" />
        },
        body: {
          children: loremIpsum
        }
      },
      {
        collapsed: false,
        header: {
          text: "My Applications",
          chevron: true,
          actions: <i className="icon-ellipsis-horizontal" />
        },
        body: {
          children: loremIpsum
        }
      },
      {
        collapsed: false,
        header: {
          text: "Free Trials",
          chevron: true,
          actions: <i className="icon-ellipsis-horizontal" />
        },
        body: {
          children: loremIpsum
        }
      }
    ];

    const cards = data.map((x, index) => (
      <AccordionCard
        collapsed={x.collapsed}
        key={`platform-accordion__card_${index}`}>
        <AccordionHeader chevron={x.header.chevron} actions={x.header.actions}>
          {x.header.text}
        </AccordionHeader>
        {x.body && (
          <AccordionBody>
            <AccordionBodyContent>{x.body.children}</AccordionBodyContent>
          </AccordionBody>
        )}
      </AccordionCard>
    ));

    return (
      <div className="atomic-ui-root theme-dusk">
        <Accordion className="platform-accordion">{cards}</Accordion>
      </div>
    );
  });
