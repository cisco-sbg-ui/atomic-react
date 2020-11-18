const get = require("lodash/get");
const remarkSlug = require("remark-slug");

const query = `
{
  allMdx {
    edges {
      node {
        id
        frontmatter {
          route
          name
          components
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
  allComponentMetadata {
    nodes {
      displayName
      props {
        docblock
        name
      }
    }
  }
}
`;

// List of attributes to snippet, with an optional maximum number of words to snippet.
const settings = {attributesToSnippet: [`excerpt:20`]};
const queries = [
  {
    query: query,
    transformer: (gqlResponse) => {
      const allProps = get(gqlResponse, "data.allComponentMetadata.nodes", []);
      const records = get(gqlResponse, "data.allMdx.edges", []).map(
        ({node}) => {
          let components = null;
          let props = null;
          if (node.frontmatter.components) {
            components = node.frontmatter.components.split(",");
            props = components.map((x) =>
              allProps.find((y) => y.displayName === x)
            );
          }

          return {
            objectID: node.id,
            route: node.frontmatter.route,
            name: node.frontmatter.name,
            components,
            excerpt: node.excerpt,
            props
          };
        }
      );

      return records;
    },
    settings
  }
];

const plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `components`,
      path: `${__dirname}/framework`,
      ignore: [`**/*.!(spec).js`, `**/*.png`]
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `docs`,
      path: `${__dirname}/framework`,
      ignore: [`**/*.!(mdx)`]
    }
  },
  {
    resolve: "gatsby-plugin-page-creator",
    options: {
      path: `${__dirname}/framework`,
      ignore: [`**/*`]
    }
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      shouldBlockNodeFromTransformation(node) {
        return node.extension !== "mdx";
      },
      remarkPlugins: [remarkSlug]
    }
  },
  "gatsby-plugin-sass",
  "gatsby-plugin-react-svg",
  "gatsby-plugin-react-helmet",
  "gatsby-transformer-react-docgen"
];

if (process.env.ALGOLIA_ADMIN_KEY) {
  plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
      queries,
      chunkSize: 10000 // default: 1000
    }
  });
}

module.exports = {
  plugins
};
