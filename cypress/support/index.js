import "@cypress/code-coverage/support";

import "cypress-axe";

import "./commands";

require("cypress-plugin-tab");

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false
});
