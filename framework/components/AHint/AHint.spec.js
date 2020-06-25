context("AHint", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=extend-hint--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--extend-hint--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-hint--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--extend-hint--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-hint--dusk-1");
  });
});
