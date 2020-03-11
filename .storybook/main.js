module.exports = {
  stories: ["../framework/**/*.stories.mdx"],
  addons: [
    "@storybook/addon-docs",
    {
      name: "@storybook/preset-scss",
      options: {
        sassLoaderOptions: {
          implementation: require("sass")
        }
      }
    }
  ]
};
