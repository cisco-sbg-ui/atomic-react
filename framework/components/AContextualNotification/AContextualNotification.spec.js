context("AContextualNotification", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-contextual-notifications--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-contextual-notifications--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-contextual-notifications--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification--dusk-1");
  });
});
