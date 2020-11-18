const path = require("path");
exports.createPages = async ({graphql, actions, reporter}) => {
  const {createPage} = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              route
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const pages = result.data.allMdx.edges;
  pages.forEach(({node}) => {
    if (!node.frontmatter.route) return;
    createPage({
      path: node.frontmatter.route,
      component: path.resolve(`./docs/Layout.js`),
      context: {id: node.id}
    });
  });
};

exports.onCreateWebpackConfig = ({stage, actions}) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom"
        }
      }
    });
  }
};
