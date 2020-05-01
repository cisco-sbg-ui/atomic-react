context("ATimeline", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-timeline--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.matchImageSnapshot("a-timeline--theme");
  });
});
