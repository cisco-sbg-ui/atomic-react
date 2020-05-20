context("ATheme", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-themes--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    cy.get("#story--components-themes--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-theme--usage-1");

    cy.get("#story--components-themes--usage-1 .a-button").eq(1).click();

    cy.get("#story--components-themes--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-theme--usage-2");
  });
});
