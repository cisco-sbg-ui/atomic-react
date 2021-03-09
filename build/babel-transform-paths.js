const {join, dirname, relative} = require("path");
const wrapListener = require("babel-plugin-detective/wrap-listener");

module.exports = wrapListener(listener, "transform-paths");

function listener(path, file) {
  if (!path.isLiteral()) return;

  if (
    path.node.value === "./AAppContext" ||
    path.node.value === "../AApp/AAppContext"
  ) {
    path.node.value = "../../../AAppContext";
  }

  if (path.node.value === "./AAccordionContext") {
    path.node.value = "./../../../AAccordionContext";
  }

  if (path.node.value === "./AAccordionPanelContext") {
    path.node.value = "./../../../AAccordionPanelContext";
  }

  if (
    path.node.value === "../AButtonGroup/AButtonGroupContext" ||
    path.node.value === "./AButtonGroupContext"
  ) {
    path.node.value = "./../../../AButtonGroupContext";
  }

  if (
    path.node.value === "../AForm/AFormContext" ||
    path.node.value === "./AFormContext"
  ) {
    path.node.value = "./../../../AFormContext";
  }

  if (path.node.value === "./ATabContext") {
    path.node.value = "./../../../ATabContext";
  }

  if (path.node.value === "./AThemeContext") {
    path.node.value = "./../../../AThemeContext";
  }

  if (path.node.value.endsWith(".scss") || path.node.value.endsWith(".json")) {
    const from = dirname(relative(file.opts.cwd, file.opts.filename));
    path.node.value = "./" + join("../../../", from, path.node.value);
  }
}
