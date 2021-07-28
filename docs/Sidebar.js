import React, {useEffect, useRef, useState} from "react";
import {Link} from "gatsby";

import AButton from "../framework/components/AButton";
import AIcon from "../framework/components/AIcon";
import ATree from "../framework/components/ATree";
import {useATheme} from "../framework/components/ATheme";

import Search from "./Search";
import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar = ({menus, currentDoc}) => {
  const [items, setItems] = useState([]);
  const currentDocRef = useRef();
  const {currentTheme} = useATheme();
  useEffect(() => {
    if (currentDocRef.current) {
      window.scrollTo(0, Math.max(0, currentDocRef.current.offsetTop - 65));
    }
  }, []);

  useEffect(() => {
    const newItems = [
      {
        content: "Getting Started",
        contentComponent: Link,
        contentProps: {
          to: "/"
        },
        active: "/" === currentDoc.frontmatter.route
      },
      {
        content: "Changelog",
        contentComponent: Link,
        contentProps: {
          to: "/changelog"
        },
        active: "/changelog" === currentDoc.frontmatter.route
      },
      {
        content: "Components",
        items: [],
        expanded: currentDoc.frontmatter.route.startsWith("/components/")
      },
      {
        content: "Extend",
        items: [],
        expanded: currentDoc.frontmatter.route.startsWith("/extend/")
      },
      {
        content: "Services",
        items: [],
        expanded: currentDoc.frontmatter.route.startsWith("/services/")
      }
    ];

    menus?.forEach((item) => {
      const bucketIndex = item.node.frontmatter.route.startsWith("/components/")
        ? 2
        : item.node.frontmatter.route.startsWith("/extend/")
        ? 3
        : item.node.frontmatter.route.startsWith("/services/")
        ? 4
        : null;
      if (!bucketIndex) return;

      newItems[bucketIndex].items.push({
        content: item.node.frontmatter.name,
        contentComponent: Link,
        contentProps: {
          to: item.node.frontmatter.route
        },
        active: item.node.frontmatter.route === currentDoc.frontmatter.route,
        expanded: item.node.frontmatter.route === currentDoc.frontmatter.route,
        items: item.node.headings?.map((heading) => ({
          contentComponent: Link,
          contentProps: {
            to:
              item.node.frontmatter.route +
              "#" +
              heading.value.toLowerCase().replace(/ /g, "-")
          },
          content: heading.value
        }))
      });
    });

    setItems(newItems);
  }, [menus, currentDoc]);

  return (
    <div
      className={`root-sidebar white--text overflow-y-scroll py-3${
        currentTheme === "dusk" ? " grey--darken-6" : " cisco-blue"
      }`}
      style={{
        position: "fixed",
        height: "100%",
        width: 330
      }}>
      <h1>
        <AIcon size={60} className="pl-4 pr-3 vertical-align-center">
          cisco
        </AIcon>
        Atomic-React
      </h1>
      <div className="d-flex align-center px-3 py-2">
        <ThemeSwitcher />
        <AButton
          className="white--text"
          icon
          tertiaryAlt
          href="https://www.github.com/advthreat/atomic-react"
          target="_blank">
          <AIcon>github</AIcon>
        </AButton>
      </div>
      <div className="px-3 pb-3">
        <Search />
      </div>
      <ATree
        className="white--text"
        hoverable
        activatable
        expandOnClick
        items={menus ? items : []}
        onChange={(x) => setItems(x)}
      />
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
