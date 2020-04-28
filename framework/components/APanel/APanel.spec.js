context("APanel", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-panels--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-panels--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-panel--variants-1");

    cy.get("#story--components-panels--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-panel--dusk-1");
  });
});
