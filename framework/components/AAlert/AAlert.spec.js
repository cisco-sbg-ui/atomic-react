context("AAlert", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-alerts--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-alerts--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-alert--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-alerts--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-alert--dusk-1");
  });
});
