import "@cypress/code-coverage/support";
import { mount as cypressMount } from '@cypress/react';
import AApp from "../../framework/components/AApp";

import "./commands";

Cypress.Commands.add('mount', (children) => {
  return cypressMount(<AApp>{children}</AApp>);
});

require("cypress-plugin-tab");

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false
});
