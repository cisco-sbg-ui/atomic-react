const {initPlugin} = require("cypress-plugin-snapshots/plugin");

/**
 * @type {Cypress.PluginConfig}
 * `on` is used to hook into various events Cypress emits
 * `config` is the resolved Cypress config
 */
module.exports = (on, config) => {
  require("@cypress/code-coverage/task")(on, config);
  on("file:preprocessor", require("@cypress/code-coverage/use-babelrc"));

  initPlugin(on, config);

  return config;
};
