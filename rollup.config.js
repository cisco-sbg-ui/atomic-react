import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import filesize from "rollup-plugin-filesize";
import json from "@rollup/plugin-json";
import localResolve from "rollup-plugin-local-resolve";
import copy from "rollup-plugin-copy";
import url from "@rollup/plugin-url";

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
    AApp: "framework/components/AApp",
    AButton: "framework/components/AButton",
    ACheckbox: "framework/components/ACheckbox",
    ADivider: "framework/components/ADivider",
    AHeader: "framework/components/AHeader",
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
    url({
      include: [
        "framework/components/AApp/base/fonts/*.ttf",
        "framework/components/AApp/base/fonts/*.woff",
        "framework/components/AApp/base/fonts/*.woff2"
      ]
    }),
    copy({
      targets: [{src: "./framework/components/AApp/base/fonts", dest: "./dist"}]
    }),
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
