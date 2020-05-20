context("ASimpleTable", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-simple-tables--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    cy.get("#story--components-simple-tables--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-simple-table--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-simple-tables--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-simple-table--dusk-1");
  });
});
