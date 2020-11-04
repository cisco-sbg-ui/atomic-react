context("APanel", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-panels--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-panels--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-panel--variants-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-panels--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-panel--dusk-1");
  });
});
