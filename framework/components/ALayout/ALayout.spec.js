context("ALayout", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-layouts--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-layouts--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-layouts--usage-1");
  });
});
