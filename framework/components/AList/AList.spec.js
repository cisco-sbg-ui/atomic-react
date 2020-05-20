context("AList", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-lists--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-lists--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-list--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-lists--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-list--dusk-1");
  });
});
