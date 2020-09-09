import glob from "glob";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import filesize from "rollup-plugin-filesize";
import json from "@rollup/plugin-json";
import localResolve from "rollup-plugin-local-resolve";

const GLOBALS = {
  react: "React",
  "react-dom": "ReactDOM"
};

const files = glob.sync("framework/**/index.js");

let filesObj = files.reduce((acc, val) => {
  const path = val.split("/");
  if (path[1] === "components") {
    acc[path[2]] = val;
  }

  if (path[1] === "index.js") {
    acc.index = val;
  }

  return acc;
}, {});

const contextFiles = glob.sync("framework/**/*Context.js");

filesObj = contextFiles.reduce((acc, val) => {
  const path = val.split("/");
  acc[path[3].slice(0, -3)] = val;
  return acc;
}, filesObj);

const config = {
  input: filesObj,
  output: {
    format: "es",
    globals: GLOBALS,
    dir: "./",
    entryFileNames: "[name].js"
  },
  external: ["react", "react-dom"],
  plugins: [
    json({
      compact: true,
      preferConst: true
    }),
    postcss({
      config: false,
      extract: false
    }),
    babel({
      exclude: "node_modules/**"
    }),
    localResolve(),
    resolve({
      browser: true
    }),
    commonjs(),
    filesize()
  ]
};

export default config;
