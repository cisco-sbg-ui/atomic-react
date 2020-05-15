context("ADialog", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-dialogs--usage-1&viewMode=docs"
    );
  });

  it("opens/closes appropriately", () => {
    cy.get("#story--components-dialogs--usage-1 .a-button").eq(0).click();
    cy.get("#story--components-dialogs--usage-1 .a-dialog")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .should("have.attr", "role", "document")
      .type("{esc}");
    cy.get("#story--components-dialogs--usage-1 .a-button")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .click();
    cy.get("#story--components-dialogs--usage-1 .a-dialog")
      .eq(0)
      .click("bottom");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000);

    cy.get("#story--components-dialogs--usage-1 .a-button").eq(0).click();
    cy.get("#story--components-dialogs--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-dialog--usage-1");

    cy.get("#story--components-dialogs--dusk-1 .a-button").eq(0).click();
    cy.get("#story--components-dialogs--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-dialog--dusk-1");
  });
});
