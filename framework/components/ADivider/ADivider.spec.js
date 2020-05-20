context("ADivider", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-dividers--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    cy.get("#story--components-dividers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-divider--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-dividers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-divider--dusk-1");
  });
});
