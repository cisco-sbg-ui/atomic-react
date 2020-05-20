context("ABadge", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-badges--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    cy.get("#story--components-badges--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-badge--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-badges--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-badge--dusk-1");
  });
});
