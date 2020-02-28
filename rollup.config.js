import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import filesize from "rollup-plugin-filesize";
import autoprefixer from "autoprefixer";
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
    postcss({
      extract: true,
      plugins: [autoprefixer]
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
