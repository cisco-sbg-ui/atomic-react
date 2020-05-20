context("ATimeline", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-timelines--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-timelines--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-timeline--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-timelines--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-timeline--dusk-1");
  });
});
