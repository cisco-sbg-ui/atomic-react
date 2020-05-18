context("ABadge", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-badges--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-badges--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-badge--usage-1");

    cy.get("#story--components-badges--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-badge--dusk-1");
  });
});
