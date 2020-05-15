context("ATag", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-tags--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    cy.get("#story--components-tags--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tag--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-tags--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-tag--dusk-1");
  });
});
