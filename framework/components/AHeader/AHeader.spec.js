context("AHeader", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-headers--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-headers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-header--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-headers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-header--dusk-1");
  });
});
