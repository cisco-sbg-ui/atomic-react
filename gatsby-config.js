const get = require("lodash/get");
const merge = require("lodash/merge");
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
        }
        excerpt(pruneLength: 5000)
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
    transformer: (gqlResponse) =>
      get(gqlResponse, "data.allMdx.edges", []).map(({node}) => ({
        objectID: node.id,
        route: node.frontmatter.route,
        name: node.frontmatter.name,
        excerpt: node.excerpt
      })),
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
