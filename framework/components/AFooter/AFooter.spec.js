context("AFooter", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-footers--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-footers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-footer--usage-1");

    cy.get("#story--components-footers--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-footer--dusk-1");
  });
});
