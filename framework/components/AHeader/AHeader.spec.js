context("AHeader", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-headers--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-headers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-header--usage-1");

    cy.get("#story--components-headers--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-header--dusk-1");
  });
});
