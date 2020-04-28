context("AButton", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-buttons--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-buttons--variant-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-button--variant-1");

    cy.get("#story--components-buttons--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-button--dusk-1");
  });
});
