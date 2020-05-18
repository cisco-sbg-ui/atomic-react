context("ASwitch", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-switches--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  // TODO: First snapshot should be a `states` story, not usage.

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-switches--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-switch--usage-1");

    cy.get("#story--components-switches--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-switch--dusk-1");
  });
});
