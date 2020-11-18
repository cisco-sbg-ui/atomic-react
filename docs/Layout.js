import React from "react";
import {Helmet} from "react-helmet";
import {Link, graphql} from "gatsby";
import {MDXProvider} from "@mdx-js/react";
import {MDXRenderer} from "gatsby-plugin-mdx";

import AApp from "../framework/components/AApp";
import {ACol, AContainer, ARow} from "../framework/components/ALayout";
import HiddenFontSwatches from "./HiddenFontSwatches";
import Sidebar from "./Sidebar";
import PropsContext from "./PropsContext";
import MdxHeadings from "./MdxHeadings";

import "./styles.css";

export default function Layout({data}) {
  const {edges: menus} = data.allMdx;
  const propsContextValue = data.allComponentMetadata.nodes;
  const currentDoc = data.mdx;

  return (
    <>
      <Helmet
        title={`${currentDoc.frontmatter.name} | atomic-react`}
        defer={false}>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Helmet>
      <AApp persistTheme>
        <HiddenFontSwatches />
        <AContainer fluid className="pa-0">
          <ARow noGutters>
            <ACol style={{maxWidth: 330}}>
              <Sidebar currentDoc={currentDoc} menus={menus} />
            </ACol>
            <ACol className="pa-8" style={{maxWidth: "calc(100vw - 347px)"}}>
              <PropsContext.Provider value={propsContextValue}>
                <MDXProvider components={{Link, ...MdxHeadings}}>
                  <MDXRenderer>{currentDoc.body}</MDXRenderer>
                </MDXProvider>
              </PropsContext.Provider>
            </ACol>
          </ARow>
        </AContainer>
      </AApp>
    </>
  );
}

export const pageQuery = graphql`
  query layoutQuery($id: String) {
    allMdx {
      edges {
        node {
          frontmatter {
            name
            route
          }
          headings(depth: h2) {
            depth
            value
          }
        }
      }
    }
    mdx(id: {eq: $id}) {
      body
      frontmatter {
        name
        route
      }
    }
    allComponentMetadata {
      nodes {
        displayName
        props {
          defaultValue {
            value
          }
          docblock
          name
          required
          type {
            name
            value
          }
        }
      }
    }
  }
`;
