var path = require("path");

module.exports = {
  stories: ["../framework/**/*.stories.mdx"],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            implementation: require("sass")
          }
        }
      ],
      include: path.resolve(__dirname, "../")
    });

    return config;
  },
  addons: ["@storybook/addon-knobs", "@storybook/addon-docs"]
};
