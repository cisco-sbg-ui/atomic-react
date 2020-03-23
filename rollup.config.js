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
    AAlert: "framework/components/AAlert",
    AApp: "framework/components/AApp",
    AButton: "framework/components/AButton",
    AButtonGroup: "framework/components/AButtonGroup",
    ACheckbox: "framework/components/ACheckbox",
    ADivider: "framework/components/ADivider",
    ADropdown: "framework/components/ADropdown",
    AFooter: "framework/components/AFooter",
    AHeader: "framework/components/AHeader",
    AIcon: "framework/components/AIcon",
    APanel: "framework/components/APanel",
    ARadio: "framework/components/ARadio",
    ASelect: "framework/components/ASelect",
    ASimpleTable: "framework/components/ASimpleTable",
    ATabs: "framework/components/ATabs",
    ATag: "framework/components/ATag",
    ATextarea: "framework/components/ATextarea",
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
