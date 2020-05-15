context("AFooter", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-footers--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    cy.get("#story--components-footers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-footer--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-footers--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-footer--dusk-1");
  });
});
