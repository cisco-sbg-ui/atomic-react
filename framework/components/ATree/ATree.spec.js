context("ATree", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-trees--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-trees--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tree--usage-1");

    cy.get("#story--components-trees--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tree--dusk-1");
  });
});
