import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import filesize from "rollup-plugin-filesize";
import json from "@rollup/plugin-json";
import localResolve from "rollup-plugin-local-resolve";

import pkg from "./package.json";

const INPUT_FILE_PATH = "framework/index.js";
const OUTPUT_NAME = "index";

const GLOBALS = {
  react: "React",
  "react-dom": "ReactDOM"
};

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: "umd"
  },
  {
    file: pkg.main,
    format: "cjs"
  },
  {
    file: pkg.module,
    format: "es"
  }
];

const config = OUTPUT_DATA.map(({file, format}) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    name: OUTPUT_NAME,
    globals: GLOBALS
  },
  external: ["react", "react-dom"],
  plugins: [
    json({
      compact: true,
      preferConst: true
    }),
    postcss({
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
}));

export default config;
