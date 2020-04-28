context("ASimpleTable", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-simple-tables--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-simple-tables--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-simple-table--usage-1");

    cy.get("#story--components-simple-tables--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-simple-table--dusk-1");
  });
});
