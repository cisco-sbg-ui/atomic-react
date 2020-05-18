context("AButtonGroup", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-button-groups--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-button-groups--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-button-group--usage-1");

    cy.get("#story--components-button-groups--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-button-group--dusk-1");
  });
});
