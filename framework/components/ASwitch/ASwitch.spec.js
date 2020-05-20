context("ASwitch", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-switches--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  // TODO: First snapshot should be a `states` story, not usage.

  it("supports themes", () => {
    cy.get("#story--components-switches--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-switch--states-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-switches--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-switch--dusk-1");
  });
});
