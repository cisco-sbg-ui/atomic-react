context("AButtonGroup", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-button-groups--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-button-groups--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-button-group--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-button-groups--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-button-group--dusk-1");
  });
});
