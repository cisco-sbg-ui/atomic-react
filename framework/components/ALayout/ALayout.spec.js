context("ALayout", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-layouts--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-layouts--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-layouts--usage-1");
  });
});
