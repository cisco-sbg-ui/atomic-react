context("ATree", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-trees--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-trees--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tree--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-trees--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tree--dusk-1");
  });
});
