const env = process.env.NODE_ENV;
const instrument = process.env.INSTRUMENT;

module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"]
};

if (instrument) {
  module.exports.plugins = ["istanbul"];
}

if (["lib"].includes(env)) {
  module.exports.presets = [
    "@babel/preset-react",
    ["@babel/preset-env", {modules: false}]
  ];

  if (module.exports.plugins) {
    module.exports.plugins.push("./build/babel-transform-paths.js");
  } else {
    module.exports.plugins = ["./build/babel-transform-paths.js"];
  }

  module.exports.ignore = [/\.spec\.js$/];
}
