context("ADivider", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-dividers--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-dividers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-divider--usage-1");

    cy.get("#story--components-dividers--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-divider--dusk-1");
  });
});
