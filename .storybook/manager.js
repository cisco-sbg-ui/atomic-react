import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {addons} from "@storybook/addons";
import {create} from "@storybook/theming/create";
import {SET_STORIES} from "@storybook/core-events";

import AApp from "../AApp";
import AButton from "../AButton";
import {
  AHeader,
  AHeaderLogo,
  AHeaderTitle,
  AHeaderNavigation
} from "../AHeader";
import AIcon from "../AIcon";
import ATextInput from "../ATextInput";
import ATree from "../ATree";
import {useATheme} from "../ATheme";

const StorybookHeader = () => {
  const {setCurrentTheme} = useATheme();

  useEffect(() => {
    const handleThemeChanged = (e) => {
      setCurrentTheme(e.detail.currentTheme);
    };

    window.addEventListener("themeChanged", handleThemeChanged);

    return () => window.removeEventListener("themeChanged", handleThemeChanged);
  }, [setCurrentTheme]);

  return (
    <AHeader>
      <AHeaderLogo href="/">
        <AIcon>cisco</AIcon>
      </AHeaderLogo>
      <AHeaderTitle>Atomic Components for React</AHeaderTitle>
      <AHeaderNavigation />
      <AButton
        icon
        tertiaryAlt
        href="https://www.github.com/threatgrid/atomic-react"
        target="_blank">
        <AIcon>github</AIcon>
      </AButton>
    </AHeader>
  );
};

const StorybookSidebar = ({api, nav}) => {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState(nav);
  const {currentTheme, setCurrentTheme} = useATheme();

  const recurseItems = (root, forEachLeaf) => {
    return root.map((item) => {
      if (item.items) {
        recurseItems(item.items, forEachLeaf);
      }

      if (item.contentProps && item.contentProps.id) {
        forEachLeaf(item);
      }

      return item;
    });
  };

  useEffect(() => {
    const newItems = recurseItems(items, (item) => {
      item.active = window.location.href.includes(item.contentProps.id);
    });
    setItems(newItems);

    api.on("navigateUrl", (eventData) => {
      const newItems = recurseItems(items, (item) => {
        item.active = eventData.startsWith(
          `?path=/docs/${item.contentProps.id}`
        );
      });
      setItems(newItems);
    });
  }, []);

  useEffect(() => {
    const handleThemeChanged = (e) => {
      setCurrentTheme(e.detail.currentTheme);
    };

    window.addEventListener("themeChanged", handleThemeChanged);

    return () => window.removeEventListener("themeChanged", handleThemeChanged);
  }, [setCurrentTheme]);

  useEffect(() => {
    if (currentTheme === "dusk") {
      document.body.style.backgroundColor = "#000";
      document.querySelector("iframe").style.backgroundColor = "#000";
    } else {
      document.body.style.backgroundColor = "#F6F9FC";
      document.querySelector("iframe").style.backgroundColor = "#F6F9FC";
    }
  }, [currentTheme]);

  const filterItems = (filter, base) => {
    if (!filter.length) return base.items;

    return base.items
      .map((item) => {
        if (
          !item.items &&
          !item.content.toLowerCase().includes(filter.toLowerCase())
        )
          return null;

        const newItem = {
          ...item
        };
        if (newItem.items) {
          newItem.items = filterItems(filter, newItem);
        }

        return newItem;
      })
      .filter((x) => x && (!x.items || x.items.length > 0));
  };

  return (
    <div
      className={`root-sidebar overflow-y-scroll py-3${
        currentTheme === "dusk" ? " grey--darken-6" : " cisco-blue"
      }`}>
      <div className="px-3 pb-3">
        <ATextInput
          prependIcon="filter"
          value={filter}
          onChange={({target}) => {
            setFilter(target.value);
            setItems(filterItems(target.value, {items: nav}));
          }}
        />
      </div>
      <ATree
        className="white--text"
        hoverable
        activatable
        expandOnClick
        items={items}
        onChange={(x) => setItems(x)}
      />
    </div>
  );
};

addons.register("atomic-react/header", () => {
  var rootHeader = document.createElement("div");
  rootHeader.id = "root-header";
  var body = document.querySelector("body");
  body.insertBefore(rootHeader, body.childNodes[0]);
  ReactDOM.render(
    <AApp persistTheme>
      <StorybookHeader />
    </AApp>,
    document.querySelector("#root-header")
  );

  document.querySelector("#root").className =
    "a-app a-app--wrap a-app--scrollbars";
});

addons.register("atomic-react/sidebar", (api) => {
  var rootSidebar = document.createElement("div");
  rootSidebar.id = "root-sidebar";
  var body = document.querySelector("body");
  body.insertBefore(rootSidebar, body.childNodes[1]);

  api.on(SET_STORIES, ({stories}) => {
    const storybookPages = Object.values(stories).reduce((acc, item) => {
      item.kind.split("/").reduce((currentNode, pathPart, index, original) => {
        const followedPath = currentNode.find((x) => x.content === pathPart);
        if (followedPath) {
          return followedPath.items;
        }

        if (!followedPath) {
          const newNode = {
            content: pathPart
          };

          if (index < original.length - 1) {
            newNode.expanded = true;
            newNode.items = [];
          } else {
            newNode.contentProps = {
              id: item.id,
              onClick: () => api.navigate("/docs/" + item.id),
              onKeyDown: (e) => {
                if (e.keyCode === 13) api.navigate("/docs/" + item.id);
              }
            };
          }

          currentNode.push(newNode);

          return newNode.items;
        }
      }, acc);

      return acc;
    }, []);

    ReactDOM.render(
      <AApp persistTheme>
        <StorybookSidebar api={api} nav={storybookPages} />
      </AApp>,
      document.querySelector("#root-sidebar")
    );
  });
});

const convertSvgToBase64ImgString = (SVG) =>
  `data:image/svg+xml;base64,${Buffer.from(SVG).toString("base64")}`;

const ConvertedLogo = convertSvgToBase64ImgString(
  `<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-labelledby="atomic-react__logo__title"><title id="atomic-react__logo__title">Cisco SBG Atomic components for React</title><path fill="#049fd9" d="M4.536 9.427h.7v2.79h-.7zm6.358.8c-.029-.017-.256-.148-.589-.148-.454 0-.768.317-.768.744 0 .414.301.745.768.745.33 0 .56-.131.589-.148v.748c-.09.026-.326.1-.64.1-.79 0-1.481-.546-1.481-1.445 0-.831.627-1.444 1.48-1.444.33 0 .574.08.64.1zm-7.321 0c-.03-.017-.253-.148-.59-.148-.454 0-.767.317-.767.744 0 .414.3.745.768.745.33 0 .56-.131.589-.148v.748c-.087.026-.327.1-.64.1-.788 0-1.482-.546-1.482-1.445 0-.831.627-1.444 1.482-1.444.33 0 .572.08.64.1zm10.997.593c0 .8-.614 1.444-1.468 1.444-.855 0-1.47-.645-1.47-1.444 0-.796.615-1.444 1.47-1.444.854.003 1.468.648 1.468 1.444zm-1.468-.732a.72.72 0 00-.727.732c0 .404.31.735.727.735a.72.72 0 00.726-.735.72.72 0 00-.726-.732zm-5.204-.025a2.387 2.387 0 00-.547-.087c-.281 0-.435.093-.435.228 0 .17.205.228.323.266l.192.061c.455.145.663.46.663.8 0 .7-.615.936-1.152.936-.375 0-.723-.067-.759-.077v-.641c.061.016.356.102.663.102.349 0 .509-.102.509-.26 0-.14-.138-.221-.314-.279-.042-.013-.106-.035-.15-.048-.39-.125-.717-.353-.717-.815 0-.52.39-.873 1.037-.873.342 0 .662.083.684.09v.597zM.708 6.43a.347.347 0 00-.348-.347.347.347 0 00-.349.347v.731a.35.35 0 00.349.35.35.35 0 00.348-.35v-.73zm1.914-.96a.35.35 0 00-.349-.35.35.35 0 00-.348.35v1.692a.35.35 0 00.348.35.35.35 0 00.35-.35V5.47zm1.91-1.315a.347.347 0 00-.348-.348.35.35 0 00-.349.347v3.703a.35.35 0 00.349.35.35.35 0 00.349-.35V4.155zM6.446 5.47a.35.35 0 00-.349-.35.35.35 0 00-.348.35v1.692a.35.35 0 00.348.35.35.35 0 00.349-.35zm1.914.96a.347.347 0 10-.695 0v.732a.35.35 0 00.35.35.347.347 0 00.345-.35zm1.913-.96a.35.35 0 00-.349-.35.35.35 0 00-.348.35v1.692a.35.35 0 00.348.35.35.35 0 00.35-.35zm1.914-1.315a.347.347 0 00-.349-.348.35.35 0 00-.349.347v3.703a.35.35 0 00.349.35.35.35 0 00.349-.35zM14.1 5.47a.35.35 0 00-.7 0v1.692a.35.35 0 00.7 0V5.47zm1.911.96a.347.347 0 00-.349-.347.35.35 0 00-.349.347v.732a.35.35 0 00.349.35.35.35 0 00.349-.35z" /></svg>`
);

addons.setConfig({
  theme: create({
    base: "light",

    colorPrimary: "#39393b",
    colorSecondary: "#049fd9",

    // UI
    //appBg: "white",
    //appContentBg: "silver",
    //appBorderColor: "grey",
    appBorderRadius: 3,

    // Typography
    //fontBase: '"Open Sans", sans-serif',
    //fontCode: "monospace",

    // Text colors
    //textColor: "black",
    //textInverseColor: "rgba(255,255,255,0.9)",

    // Toolbar default and active colors
    //barTextColor: "silver",
    //barSelectedColor: "black",
    //barBg: "hotpink",

    // Form colors
    //inputBg: "white",
    //inputBorder: "silver",
    //inputTextColor: "black",
    //inputBorderRadius: 4,

    brandTitle: "Cisco SBG Atomic components for React",
    //brandUrl: "https://example.com",
    brandImage: ConvertedLogo
  })
});
