const env = process.env.BABEL_ENV;

let config = {
  presets: ["babel-preset-gatsby"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "istanbul",
      {
        exclude: [".cache/*", "docs/*"]
      }
    ]
  ]
};

if (["cra"].includes(env)) {
  config = {
    presets: ["@babel/preset-react", "@babel/preset-env"]
  };
}

if (["lib"].includes(env)) {
  config = {
    presets: ["@babel/preset-react", ["@babel/preset-env", {modules: false}]],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "./build/babel-transform-paths.js"
    ],
    ignore: [/\.spec\.js$/]
  };
}

module.exports = config;
