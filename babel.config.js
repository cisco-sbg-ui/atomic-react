const env = process.env.NODE_ENV;

module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"]
};

if (["lib"].includes(env)) {
  module.exports.presets = [
    "@babel/preset-react",
    ["@babel/preset-env", {modules: false}]
  ];
  module.exports.plugins = ["./build/babel-transform-paths.js"];
  module.exports.ignore = [/\.spec\.js$/];
}
