const nodeEnv = process.env.NODE_ENV;
const env = process.env.BABEL_ENV;

let config = {
  presets: ["babel-preset-gatsby"],
  plugins: []
};

if (nodeEnv !== "production") {
  config.plugins.push([
    "istanbul",
    {
      exclude: [".cache/*", "docs/*"]
    }
  ]);
}

if (["cra"].includes(env)) {
  config = {
    presets: ["@babel/preset-react", "@babel/preset-env"]
  };
}

if (["lib"].includes(env)) {
  config = {
    presets: ["@babel/preset-react", ["@babel/preset-env", {modules: false}]],
    plugins: ["./build/babel-transform-paths.js"],
    ignore: [/\.spec\.js$/]
  };
}

if (["lib-demo"].includes(env)) {
  config = {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "./babel-preset-local.js"
    ]
  };
}

module.exports = config;
