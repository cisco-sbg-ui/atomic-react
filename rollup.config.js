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
    AAccordion: "framework/components/AAccordion",
    AAlert: "framework/components/AAlert",
    AApp: "framework/components/AApp",
    AAutocomplete: "framework/components/AAutocomplete",
    ABadge: "framework/components/ABadge",
    AButton: "framework/components/AButton",
    AButtonGroup: "framework/components/AButtonGroup",
    ACheckbox: "framework/components/ACheckbox",
    ACombobox: "framework/components/ACombobox",
    AContextualNotification: "framework/components/AContextualNotification",
    ADialog: "framework/components/ADialog",
    ADivider: "framework/components/ADivider",
    ADropdown: "framework/components/ADropdown",
    AFooter: "framework/components/AFooter",
    AHeader: "framework/components/AHeader",
    AIcon: "framework/components/AIcon",
    AInputBase: "framework/components/AInputBase",
    ALayout: "framework/components/ALayout",
    ALoader: "framework/components/ALoader",
    AList: "framework/components/AList",
    APanel: "framework/components/APanel",
    ARadio: "framework/components/ARadio",
    ASelect: "framework/components/ASelect",
    ASimpleTable: "framework/components/ASimpleTable",
    ASwitch: "framework/components/ASwitch",
    ATabs: "framework/components/ATabs",
    ATag: "framework/components/ATag",
    ATextarea: "framework/components/ATextarea",
    ATextInput: "framework/components/ATextInput",
    ATimeline: "framework/components/ATimeline",
    ATheme: "framework/components/ATheme",
    ATree: "framework/components/ATree"
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
