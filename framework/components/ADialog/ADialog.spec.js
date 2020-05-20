context("ADialog", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-dialogs--usage-1&viewMode=docs"
    );
  });

  it("opens/closes appropriately", () => {
    cy.get("#story--components-dialogs--usage-1 .a-button").eq(0).click();
    cy.get(".a-app .a-dialog")
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
    cy.isCovered("#story--components-dialogs--usage-1 .a-button:nth-child(1)");
    cy.get(".a-app .a-dialog").eq(0).click("bottom");
  });
});
