import React, {FunctionComponent} from "react";
import {styled} from "@storybook/theming";
import {transparentize} from "polished";

import {getBlockBackgroundStyle} from "./BlockBackgroundStyles";

const ItemTitle = styled.div(({theme}) => ({
  fontWeight: theme.typography.weight.bold,
  color: theme.color.defaultText
}));

const ItemSubtitle = styled.div(({theme}) => ({
  color:
    theme.base === "light"
      ? transparentize(0.2, theme.color.defaultText)
      : transparentize(0.6, theme.color.defaultText)
}));

const ItemDescription = styled.div({
  flex: "0 0 30%",
  lineHeight: "20px",
  marginTop: 5
});

const SwatchLabel = styled.div(({theme}) => ({
  flex: 1,
  textAlign: "center",
  fontFamily: theme.typography.fonts.mono,
  fontSize: theme.typography.size.s1,
  lineHeight: 1,
  overflow: "hidden",
  color:
    theme.base === "light"
      ? transparentize(0.4, theme.color.defaultText)
      : transparentize(0.6, theme.color.defaultText),

  "> div": {
    display: "inline-block",
    overflow: "hidden",
    maxWidth: "100%"
  },

  span: {
    display: "block",
    marginTop: 2
  }
}));

const SwatchLabels = styled.div({
  display: "flex",
  flexDirection: "row"
});

const Swatch = styled.div({
  flex: 1
});

const SwatchColors = styled.div(({theme}) => ({
  ...getBlockBackgroundStyle(theme),
  display: "flex",
  flexDirection: "row",
  height: 50,
  marginBottom: 5,
  overflow: "hidden"
}));

const SwatchSpecimen = styled.div({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  position: "relative",
  marginBottom: 30
});

const Swatches = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "row"
});

const Item = styled.div({
  display: "flex",
  alignItems: "flex-start"
});

const ListName = styled.div({
  flex: "0 0 30%"
});

const ListSwatches = styled.div({
  flex: 1
});

const ListHeading = styled.div(({theme}) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingBottom: 20,
  fontWeight: theme.typography.weight.bold,
  color:
    theme.base === "light"
      ? transparentize(0.4, theme.color.defaultText)
      : transparentize(0.6, theme.color.defaultText)
}));

const List = styled.div(({theme}) => ({
  fontSize: theme.typography.size.s2,
  lineHeight: `20px`,

  display: "flex",
  flexDirection: "column"
}));

type Colors = string[] | {[key: string]: string};

interface ColorProps {
  title: string;
  subtitle: string;
  colors: Colors;
}

function renderSwatch(color: string) {
  return (
    <Swatch
      key={color}
      title={color}
      style={{
        backgroundColor: color
      }}
    />
  );
}

function renderSwatchLabel(color: string, colorDescription?: string) {
  return (
    <SwatchLabel key={color} title={color}>
      <div>
        {color}
        {colorDescription && <span>{colorDescription}</span>}
      </div>
    </SwatchLabel>
  );
}

function renderSwatchSpecimen(colors: Colors) {
  if (Array.isArray(colors)) {
    return (
      <SwatchSpecimen>
        <SwatchColors>{colors.map(color => renderSwatch(color))}</SwatchColors>
        <SwatchLabels>
          {colors.map(color => renderSwatchLabel(color))}
        </SwatchLabels>
      </SwatchSpecimen>
    );
  }
  return (
    <SwatchSpecimen>
      <SwatchColors>
        {Object.values(colors).map(color => renderSwatch(color))}
      </SwatchColors>
      <SwatchLabels>
        {Object.keys(colors).map(color =>
          renderSwatchLabel(color, colors[color])
        )}
      </SwatchLabels>
    </SwatchSpecimen>
  );
}

/**
 * A single color row your styleguide showing title, subtitle and one or more colors, used
 * as a child of `ColorPalette`.
 */
export const ColorItem: FunctionComponent<ColorProps> = ({
  title,
  subtitle,
  colors
}) => {
  return (
    <Item>
      <ItemDescription>
        <ItemTitle>{title}</ItemTitle>
        <ItemSubtitle>{subtitle}</ItemSubtitle>
      </ItemDescription>
      <Swatches>{renderSwatchSpecimen(colors)}</Swatches>
    </Item>
  );
};

/**
 * Styleguide documentation for colors, including names, captions, and color swatches,
 * all specified as `ColorItem` children of this wrapper component.
 */
export const ColorPalette: FunctionComponent = ({children, ...props}) => (
  <List {...props} className="docblock-colorpalette">
    <ListHeading>
      <ListName>Name</ListName>
      <ListSwatches>Swatches</ListSwatches>
    </ListHeading>
    {children}
  </List>
);
