context("AButton", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-buttons--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-buttons--variant-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-button--variant-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-buttons--variant-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-button--dusk-1");
  });
});
