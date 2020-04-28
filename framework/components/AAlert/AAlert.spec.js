context("AAlert", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-alerts--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-alerts--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-alert--usage-1");

    cy.get("#story--components-alerts--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-alert--dusk-1");
  });
});
