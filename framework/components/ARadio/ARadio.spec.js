context("ARadio", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-radio-buttons--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  // TODO: First snapshot should be of a `states` story, not usage.

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-radio-buttons--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-radio-buttons--usage-1");

    cy.get("#story--components-radio-buttons--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-radio-buttons--dusk-1");
  });
});
