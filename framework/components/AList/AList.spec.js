context("AList", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-lists--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-lists--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-list--usage-1");

    cy.get("#story--components-lists--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-list--dusk-1");
  });
});
