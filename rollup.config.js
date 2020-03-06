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

const config = {
  input: {
    /**
     * Eventually, use something like:
     * const { readdirSync } = require('fs')
     *
     * const directories = readdirSync(
     *     require('path').resolve(__dirname, "framework"),
     *     { withFileTypes: true }
     *   )
     *   .filter(dirent => dirent.isDirectory())
     *   .map(dirent => dirent.name)
     *
     * ...directories.reduce(packages, x => {
     *  packages[x] = "framework/components/" + x
     * }, {})
     */
    index: "framework",
    AButton: "framework/components/AButton",
    ACheckbox: "framework/components/ACheckbox",
    ADivider: "framework/components/ADivider",
    AIcon: "framework/components/AIcon",
    APanel: "framework/components/APanel",
    ATabs: "framework/components/ATabs",
    ATextInput: "framework/components/ATextInput"
  },
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
